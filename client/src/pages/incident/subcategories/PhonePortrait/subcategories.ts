import { Component } from '@angular/core';
import { Screen } from 'app/screen';
declare var window: any;

@Component({
  selector: 'screen-incident-subcategories_phoneportrait',
  templateUrl: 'subcategories.html'
})
export class incident_subcategories_PhonePortrait extends Screen {
  data: any;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.
    this.data.footer = { active: '' };
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
}
