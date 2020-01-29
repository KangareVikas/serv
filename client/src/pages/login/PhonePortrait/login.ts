import { Component, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';

declare var window: any;

@Component({
    selector: 'screen-login-phoneportrait',
    templateUrl: 'login.html'
})
export class login_PhonePortrait extends Screen {
    @ViewChild('content') content;
    data: any;

    ngOnInit(): void {
        super.ngOnInit();
        if (window.localStorage.hasOwnProperty('cherwellDemoUser')) {
            this.data.demo = true;
        }
        this.hideMenu();
        // let refreshToken = localStorage.getItem('refresh_token');
        // if (refreshToken) {
        //     this.data.refresh_token = refreshToken;
        // }
        // window.addEventListener('native.keyboardshow', this.keyboardShownHandler.bind(this));
        // window.addEventListener('native.keyboardhide', this.keyboardHiddenHandler.bind(this));
        // Logic to run when the screen loads goes here.
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();

        // window.removeEventListener('native.keyboardshow', this.keyboardShownHandler, true);
        // window.removeEventListener('native.keyboardhide', this.keyboardHiddenHandler, true);
        // Logic to run when the screen unloads goes here.
    }

    onDataLoad(data: any): void {
        if (window.localStorage.hasOwnProperty('cherwellDemoUser')) {
            this.data.demo = true;
        }
        //   if (data.errorMessage || data.invalid_refresh_token) {
        //       localStorage.removeItem('refresh_token');
        //       this.data.refresh_token = null;
        //   } else {
        //       let refreshToken = localStorage.getItem('refresh_token');
        //       if (refreshToken) {
        //           this.data.refresh_token = refreshToken;
        //       }
        //   }
        // Logic to run when the screen's data is updated goes here.
    }
    onBackButton(): boolean {
        //(Android) returns :
        // true - handle the event in App Hooks
        // false - stop the event propogation
        return true;
    }

    callSupport() {
        window.location.href = `tel:8778004381`
    }

    // private keyboardShownHandler(event) {
    //     this.content['_elementRef'].nativeElement.style.height = `calc(100% - ${event.keyboardHeight}px)`;
    //     document.activeElement.scrollIntoView(false);
    // }

    // private keyboardHiddenHandler() {
    //     this.content['_elementRef'].nativeElement.style.height = '100%';
    // }

    //   async ionViewDidEnter() {
    //       await super.ionViewDidEnter();
    //       let refreshToken = localStorage.getItem('refresh_token');
    //       if (refreshToken) {
    //           this.data.refresh_token = refreshToken;
    //           this.action('tokenSubmit');
    //       }
    //   }
}
