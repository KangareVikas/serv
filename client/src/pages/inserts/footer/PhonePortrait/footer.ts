import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
    selector: 'screen-inserts-footer_phoneportrait',
    templateUrl: 'footer.html'
})
export class inserts_footer_PhonePortrait extends Screen {
    data: any;

    ngOnInit(): void {
        super.ngOnInit();
        if (!this.data.footer) {
            this.data.footer = {};
        }
        // Logic to run when the screen loads goes here.
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any): void {
        // Logic to run when the screen's data is updated goes here.
    }
    onBackButton(): boolean {
        //(Android) returns :
        // true - handle the event in App Hooks
        // false - stop the event propogation
        return true;
    }
    goTo(): void {
        action('footer.home');
    }
}
