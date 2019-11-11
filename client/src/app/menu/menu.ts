import { Component } from '@angular/core';
import { Screen } from 'app/screen';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent extends Screen {
    doChat(): void {
        // do chat stuff here
        this.openUrl("slack://open");
    }
    doCall(): void {
        // do call stuff here
        this.openUrl("tel:8778004381");
    }
}
