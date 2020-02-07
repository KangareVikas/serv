import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import { FileService, PowwowLoginService, PublishInfoService } from 'smartux-client';
import * as _ from 'lodash';

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

    async onDataLoad(data: any) {
        // Logic to run when the screen's data is updated goes here.
        if (this.data.fromUrlScheme) {
            this.proceedWithCustomUrlScheme(false).catch(e => {
                this.alert(e, { title: 'Error' });
            });
        } else {
            const publishInfo = await this.publishInfoService.get();
            // If we have existing settings, let's revisit them.
            if (!publishInfo.error && !(_.isEmpty(publishInfo.cbUrl) || _.toLower(publishInfo.cbUrl) == '/cb')) {
                this.proceedWithCustomUrlScheme(true).catch(e => {
                    this.alert(e, { title: 'Error' });
                });
            }
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
                if (this.data.demo) {
                    let emailAddress = this.data.demo.trim();
                    window.localStorage.setItem('cherwellDemoUser', emailAddress);
                } else {
                    window.localStorage.removeItem('cherwellDemoUser');
                }

                // Clear touch id credentials - they will most likely not be correct.
                if (await this.touchid.isAvailable() && this.touchid.isEnabled() && await this.touchid.has('credentials')) {
                    window.localStorage.removeItem('touchidEnabled');
                    await this.touchid.delete('credentials');
                }

                await this.go('login');
            } catch (e) {
                this.alert(e, { title: 'Error' });
            }
        }
    }

    async barcodeScanned($event) {
        // Expecting a URL of the form: pwapp-<appid>://screen/<screenid>/<uri encoded JSON screen model>
        const barcodeText = $event.text;
        let qrCodeURL = barcodeText.trim();
        let expectedQRCodePrefix;
        try {
            const fileEntry = await this.getPublishedJsonFile();
            const fileObject = await this.readPublishedJsonContents(fileEntry);
            expectedQRCodePrefix = "pwapp-" + fileObject.id + "://screen/setup";
        } catch (errorMessage) {
            this.alert(errorMessage, { title: 'Error' });
            return;
        }
        if (qrCodeURL.startsWith(expectedQRCodePrefix)) {
            try {
                let scanData = JSON.parse(decodeURIComponent(qrCodeURL.substring(expectedQRCodePrefix.length + 1)));
                Object.assign(this.data, scanData);
                await this.onSubmitButton();
                return;
            } catch (e) {
            }
        }
        this.alert("This is not a valid QR code for this application", { title: 'Error' });
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

    async proceedWithCustomUrlScheme(revisitSettings) {
        const fileEntry = await this.getPublishedJsonFile();
        const fileObject = await this.readPublishedJsonContents(fileEntry);
        if (await this.isFirstSetup(fileObject)) {
            const message = `Server: <b>${this.data.server}</b><br/><br/>
                             App Id: <b>${this.data.appId}</b>`;
            if (await this.confirm(message, { title: 'Setup Confirmation', okButton: 'Submit', cancelButton: 'Setup Later' })) {
                await this.onSubmitButton();
            }
        } else if (await this.isSameCredentials(fileObject) && !revisitSettings) {
            await this.onSubmitButton();
        } else if (revisitSettings) {
            this.data.server = fileObject.cbUrl.replace('/cb', '');
            this.data.appId = fileObject.id;
            this.data.revisitSettings = true;
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

    async requestDemo() {
        let requestAccountURL = 'https://info.powwowmobile.com/in-app-demo-request-cwr';
        if (window.cordova && window.cordova.InAppBrowser) {
            this.global.inappbrowser = window.cordova.InAppBrowser.open(requestAccountURL, "_blank", "location=no,footer=yes,footercolor=#009bde,closebuttoncaption=⬅ Back to App,closebuttoncolor=#ffffff,hidenavigationbuttons=yes,toolbarcolor=#009bde,zoom=no,usewkwebview=yes");
            this.global.inappbrowser.addEventListener('exit', () => {
                this.global.inappbrowser = null;
            });
            this.global.inappbrowser.addEventListener('loaderror', () => {
                this.global.inappbrowser.close();
                this.global.inappbrowser = null;
                this.alert('Unable to access the Demo Signup page.  Please check that you are online, and try again.', { title: 'Connection Error' });
            });
        } else {
            window.open(requestAccountURL, "_blank", "location=no,zoom=no");
        }
    }
}
