import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-request-newrequest_phoneportrait',
  templateUrl: 'newrequest.html'
})
export class request_newrequest_PhonePortrait extends Screen {
    data: any;
    showAddInfo: boolean;

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
  }

  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }

  async removeAttachment() {
      await this.action('removeAttachment');
      this.data.photo = null;
  }

  fileEvent(fileInput: Event) {
      console.log(this.data.photo)
      console.log(this.data.filename)
  }
}
