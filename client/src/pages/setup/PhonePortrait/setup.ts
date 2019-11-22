import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import * as _ from 'lodash';
import { PublishInfoService, FileService, PowwowLoginService } from 'smartux-client';

declare var window: any;

@Component({
    selector: 'screen-setup-phoneportrait',
    templateUrl: 'setup.html'
})
export class setup_PhonePortrait extends Screen {
    data: any;

    constructor(private publishInfoService: PublishInfoService,
        private fileService: FileService,
        private powwowLoginService: PowwowLoginService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        // Logic to run when the screen loads goes here.
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any): void {
        // Logic to run when the screen's data is updated goes here.
        if (this.data.fromUrlScheme) {
            if (this.data.appId && this.data.appId.length && this.data.server && this.data.server.length && this.data.server.startsWith("http")) {
                this.onSubmitButton();
            }
        }
    }
    onBackButton(): boolean {
        //(Android) returns :
        // return false to prevent the app exiting when cancelling a scan
        return false;
    }

    async onSubmitButton() {
        if (this.data && !_.isEmpty(this.data.server) && !_.isEmpty(this.data.appId)) {
            let appId = this.data.appId.trim();
            let serverUrl = this.data.server.trim();
            if (serverUrl.endsWith('/')) {
                serverUrl = serverUrl.substring(0, serverUrl.length - 1);
            }
            if (appId && serverUrl) {
                try {
                    await this.updatePublishInfoCBUrl(serverUrl, appId);
                    await this.go('login');
                } catch (e) {
                    this.alert(e);
                }
            }
        }
    }

    async barcodeScanned($event) {
        // Expecting a URL of the form:
        // http(s)://server/<appId> or
        // http(s)://server/<appId>/
        const barcodeText = $event.text;
        const barcodeType = $event.format;
        let url = barcodeText.trim();
        if (url.endsWith('/')) {
            url = url.substring(0, url.length - 1);
        }
        let indexOfAppId = url.lastIndexOf('/');
        if (indexOfAppId > 0) {
            let appId = url.substring(indexOfAppId + 1);
            if (appId && appId.length) {
                this.data.appId = appId;
                this.data.server = url.substring(0, indexOfAppId);
                if (this.data.appId && this.data.appId.length && this.data.server && this.data.server.length && this.data.server.startsWith("http")) {
                    await this.onSubmitButton();
                }
            }
        }
    }

    async updatePublishInfoCBUrl(serverURL, appId) {
        if (!this.fileService.isAvailable()) {
            throw("Unable to access this app's files.");
        }
        try {
            let dirName = 'www';
            let fileName = 'published.json';
            let dirEntry = await this.fileService.resolveLocalFileSystemURL(this.fileService.getDataDirectory() + 'www');
            if (!dirEntry) {
                throw ("Unable to find 'www' directory.");
            }
            let fileEntry = await this.fileService.getFile(dirEntry, 'published.json', false);
            if (!fileEntry) {
                throw("Unable to find 'www/published.json' file.")
            }
            let fileContents = await this.fileService.readFile(fileEntry);
            if (!fileContents) {
                throw("'published.json' file is empty");
            }
            let fileObject:any = {};
            try {
                fileObject = JSON.parse(fileContents);
            } catch (e) {
                throw("'published.json' is corrupt.");
            }
            fileObject.cbUrl = serverURL + '/cb';
            fileObject.id = appId;
            await this.fileService.writeFile(fileEntry, JSON.stringify(fileObject,null,2));
            await this.publishInfoService.reload();
            await this.powwowLoginService.initialize(true);
        }
        catch (err) {
            console.log("Error:", err);
            throw ('Error updating published.json');
        }
    }

}
