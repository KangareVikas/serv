import { Component } from '@angular/core';
import { Screen } from 'app/screen';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent extends Screen {
    doChat(): void {
        // do chat stuff here
    }
    doCall(): void {
        // do call stuff here
    }
}
