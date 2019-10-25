import { Component } from '@angular/core';
import { Screen } from 'app/screen';

@Component({
  selector: 'screen-login1-phoneportrait',
  templateUrl: 'login1.html'
})
export class login1_PhonePortrait extends Screen {
  data: any;

  ngOnInit(): void {
    super.ngOnInit();
    // Logic to run when the screen loads goes here.
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    // Logic to run when the screen unloads goes here.
  }

  onDataLoad(data: any) {
    // Logic to run when the screen's data is updated goes here.
  }
}
