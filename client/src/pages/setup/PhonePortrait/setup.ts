import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import { FileService, PowwowLoginService, PublishInfoService } from 'smartux-client';

declare var window: any;

@Component({
    selector: 'screen-setup-phoneportrait',
    templateUrl: 'setup.html'
})
export class setup_PhonePortrait extends Screen {
    data: any;

    constructor(
        private publishInfoService: PublishInfoService,
        private fileService: FileService,
        private powwowLoginService: PowwowLoginService
    ) {
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
            this.proceedWithCustomUrlScheme().catch(e => {
                this.alert(e, { title: 'Error' });
            });
        }
    }

    onBackButton(): boolean {
        //(Android) returns :
        // return false to prevent the app exiting when cancelling a scan
        return false;
    }

    async onSubmitButton() {
        if (!this.isValidCredentials()) {
            return;
        }
        const appId = this.data.appId.trim();
        let serverUrl = this.data.server.trim();
        if (serverUrl.endsWith('/')) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        if (appId && serverUrl) {
            try {
                await this.updatePublishInfoCBUrl(serverUrl, appId);
                await this.go('login');
            } catch (e) {
                this.alert(e, { title: 'Error' });
            }
        }
    }

    async barcodeScanned($event) {
        // Expecting a URL of the form: http[s]://server/<appId>[/]
        const barcodeText = $event.text;
        let url = barcodeText.trim();
        if (url.endsWith('/')) { // remove trailing slash if exists
            url = url.substring(0, url.length - 1);
        }
        const urlParts = url.split('/');
        this.data.appId = urlParts.pop();
        this.data.server = urlParts.join('/');
        await this.onSubmitButton();
    }

    async updatePublishInfoCBUrl(serverURL, appId) {
        const fileEntry = await this.getPublishedJsonFile();
        const fileObject = await this.readPublishedJsonContents(fileEntry);
        fileObject.cbUrl = serverURL + '/cb';
        fileObject.id = appId;
        await this.fileService.writeFile(fileEntry, JSON.stringify(fileObject, null, 2));
        await this.publishInfoService.reload();
        await this.powwowLoginService.initialize(true);
    }

    async getPublishedJsonFile(): Promise<any> {
        if (!this.fileService.isAvailable()) {
            throw (`Unable to access the this app's files.`);
        }
        const dir = this.fileService.getDataDirectory() + 'www';
        const dirEntry = await this.fileService.resolveLocalFileSystemURL(dir);
        if (!dirEntry) {
            throw (`Unable to find "www" directory.`);
        }
        const fileEntry = await this.fileService.getFile(dirEntry, 'published.json', false);
        if (!fileEntry) {
            throw (`Unable to find "www/published.json" file.`);
        }
        return fileEntry;
    }

    async readPublishedJsonContents(fileEntry): Promise<any> {
        const fileContents = await this.fileService.readFile(fileEntry);
        if (!fileContents) {
            throw (`The "published.json" file is empty.`);
        }
        try {
            return JSON.parse(fileContents);
        } catch (e) {
            throw (`The "published.json" file is corrupt.`);
        }
    }

    async proceedWithCustomUrlScheme() {
        const fileEntry = await this.getPublishedJsonFile();
        const fileObject = await this.readPublishedJsonContents(fileEntry);
        if (await this.isFirstSetup(fileObject)) {
            const message = `Server: <b>${this.data.server}</b><br/><br/>
                             App Id: <b>${this.data.appId}</b>`;
            if (await this.confirm(message, { title: 'Setup Confirmation', okButton: 'Submit', cancelButton: 'Setup Later' }))  {
                await this.onSubmitButton();
            }
        } else if (await this.isSameCredentials(fileObject)) {
            await this.onSubmitButton();
        } else {
            this.data.existingSettings = {
                server: fileObject.cbUrl.replace('/cb', ''),
                appId: fileObject.id
            }
        }
    }

    isValidCredentials() {
        return this.data.appId && this.data.appId.length && this.data.server
            && this.data.server.length && this.data.server.startsWith('http');
    }

    async isFirstSetup(fileObject): Promise<boolean> {
        return fileObject.cbUrl === '/cb' || !fileObject.cbUrl || !fileObject.id;
    }

    async isSameCredentials(fileObject): Promise<boolean> {
        return fileObject.cbUrl === this.data.server + '/cb'
            && fileObject.id == this.data.appId;
    }

}
