import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-login-phoneportrait',
  templateUrl: 'login.html'
})
export class login_PhonePortrait extends Screen {
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
      if (data.errorMessage || data.invalid_refresh_token) {
          localStorage.removeItem('refresh_token');
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
