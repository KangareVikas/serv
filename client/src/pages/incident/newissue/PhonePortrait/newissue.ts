import { Component, ElementRef, ViewChild } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-incident-newissue_phoneportrait',
  templateUrl: 'newissue.html'
})
export class incident_newissue_PhonePortrait extends Screen {
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

  onBackButton(): boolean {
    //(Android) returns :
    // true - handle the event in App Hooks
    // false - stop the event propogation
      return true;
  }

  removeAttachment() {
      this.data.photo = null;
      this.thumbnail.nativeElement.src = 'assets/images/pixel.png';
  }

  fileEvent(fileInput: Event) {
      this.data.filename = this.data.photo[0].name;
      this.data.size = this.data.photo[0].size;
      this.global.photo = this.data.photo;
  }

  ionViewWillLeave(): Promise<void> {
    super.ionViewWillLeave();
    return this.action('clearData');
  }


  submit() {
    if (!this.data.photo && this.global.photo) {
      this.data.photo = this.global.photo
    }
    this.action('submit');
  }

}
