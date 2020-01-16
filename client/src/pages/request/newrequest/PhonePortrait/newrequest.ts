import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-request-newrequest_phoneportrait',
  templateUrl: 'newrequest.html'
})
export class request_newrequest_PhonePortrait extends Screen {
    @ViewChild('thumbnail') thumbnail;

    data: any;
    showAddInfo: boolean;

  ngOnInit(): void {
    this.global.photo = null;
    super.ngOnInit();
    // Logic to run when the screen loads goes here.
  }

  ngOnDestroy(): void {
    this.global.photo = null;
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  // onDataLoad(data: any): void {
  //   // Logic to run when the screen's data is updated goes here.
  //   if (!this.data.photo && this.global.photo) {
  //     this.data.photo = this.global.photo;
  //   }
  // }

  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }

  removeAttachment() {
      this.data.photo = null;
      delete this.global.photo;
      this.thumbnail.nativeElement.src = 'assets/images/pixel.png';
  }

  fileEvent() {
      this.data.filename = this.data.photo[0].name;
      this.data.size = this.data.photo[0].size;
      this.global.photo = this.data.photo;
  }

  submit(form) {
      if (form.valid) {
          if (!this.data.photo && this.global.photo) {
              this.data.photo = this.global.photo;
          }
          this.action('submit');
      } else {
          this.parseFormErrors(form);
      }
  }

  private parseFormErrors(form) {
      let errors = [];
      const errorMessages = [];
      Object.keys(form.controls).forEach(key => {
          const controlErrors = form.controls[key].errors;
          if (controlErrors != null) {
              Object.keys(controlErrors).forEach(keyError => {
                  errors.push(keyError);
              });
          }
      });
      errors = [...new Set(errors)];
      errors.forEach(error => {
          if (error === 'required') {
              errorMessages.push('Fill in all the required fields.');
          }
      });
      this.alert(errorMessages.join('\n'), { title: 'Save Error' });
  }
}
