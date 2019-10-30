import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-request-newrequest_phoneportrait',
  templateUrl: 'newrequest.html'
})
export class request_newrequest_PhonePortrait extends Screen {
    data: any;
    @ViewChild('top') top: ElementRef;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.
  }

  onKeyUp(event: any): void {
      let value = event.value;
      let regExp = /[^\d-]+/;

      if (regExp.test(value)) {
          event.value = value.slice(0, -1);
      }

    //   if (value.length === 4 || value.length === 9) {
    //       console.log(this.data.callBackNumber);
    //       console.log(value);
    //       if (this.data.callBackNumber.length < value.length) {
    //         event.value = value.slice(0, -1) + "-" + value[value.length - 1];
    //       } else {
    //         event.value = value.slice(0, -1)
    //       }
    //   } else {
    //       if (value[value.length - 1] === "-") {
    //           event.value = value.slice(0, -1);
    //       } else {
    //           if (regExp.test(value)) {
    //               event.value = value.slice(0, -1);
    //           }
    //       }
    //   }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
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
