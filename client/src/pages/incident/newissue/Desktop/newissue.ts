import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-incident-newissue_desktop',
  templateUrl: 'newissue.html'
})
export class incident_newissue_Desktop extends Screen {
    data: any;
    @ViewChild('top') top: ElementRef;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.

  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  onKeyUp(event: any): void {
      let value = event.value;
      let regExp = /[^\d-]+/;

      if (regExp.test(value)) {
          event.value = value.slice(0, -1);
      }
  }

  onDataLoad(data: any): void {
    // Logic to run when the screen's data is updated goes here.
      if (this.top && this.data.errorMessage) {
          this.top.nativeElement.scrollIntoView();
      }
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
