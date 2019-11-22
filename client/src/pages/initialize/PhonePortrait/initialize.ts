import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import { PublishInfoService } from 'smartux-client';
import * as _ from 'lodash';

@Component({
    selector: 'screen-initialize-phoneportrait',
    templateUrl: 'initialize.html'
})
export class initialize_PhonePortrait extends Screen {
    data: any;

    constructor(private publishInfoService: PublishInfoService) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.checkCbUrl();
        // Logic to run when the screen loads goes here.
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any) {
        // Logic to run when the screen's data is updated goes here.
    }

    async checkCbUrl() {
        const publishInfo = await this.publishInfoService.get();
        // If we don't have a cbUrl or it's the default of '/cb', let's go to setup.
        if (_.isEmpty(publishInfo.cbUrl) || _.toLower(publishInfo.cbUrl) == '/cb') {
            this.go('setup');
        } else {
            this.go('login');
        }
    }
}