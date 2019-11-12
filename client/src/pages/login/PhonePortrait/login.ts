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
    if (!this.data.username) {
        this.data.username = 'evan.employee@acme.com'
    }
    let refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        this.data.refresh_token = refreshToken;
    }
    window.addEventListener('native.keyboardshow', function () {
        this.content.resize();
    });
    window.addEventListener('native.keyboardhide', function () {
        this.content.resize();
    });
    // Logic to run when the screen loads goes here.
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  onDataLoad(data: any): void {
      if (data.errorMessage || data.invalid_refresh_token) {
          localStorage.removeItem('refresh_token');
          this.data.refresh_token = null;
      } else {
          let refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
              this.data.refresh_token = refreshToken;
          }
      }
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

  async ionViewDidEnter() {
      await super.ionViewDidEnter();
      let refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
          this.data.refresh_token = refreshToken;
          this.action('tokenSubmit');
      }
  }
}
