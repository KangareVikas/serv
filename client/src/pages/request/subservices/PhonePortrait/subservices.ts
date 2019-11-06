import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
    selector: 'screen-request-subservices_phoneportrait',
    templateUrl: 'subservices.html'
})
export class request_subservices_PhonePortrait extends Screen {
    // @ViewChild(Content) content: Content;
    @ViewChild('content') content;
    data: any;

    ngOnInit(): void {
        super.ngOnInit();
        // Logic to run when the screen loads goes here.
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any): void {
        this.content.resize();
        // Logic to run when the screen's data is updated goes here.
    }
    onBackButton(): boolean {
        //(Android) returns :
        // true - handle the event in App Hooks
        // false - stop the event propogation
        return true;
    }

    goBack(): void {
        if (this.data.selectedServices.length > 1) {
            this.data.selectedServices.pop();
            const servicesQuantity = this.data.selectedServices.length;
            const title = this.data.selectedServices[servicesQuantity - 1].title;
            this.method('goBack', { title: title });
        } else {
            this.action('back');
        }
    }
}
