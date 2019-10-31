import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-incident-newissue_phoneportrait',
  templateUrl: 'newissue.html'
})
export class incident_newissue_PhonePortrait extends Screen {
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
}
