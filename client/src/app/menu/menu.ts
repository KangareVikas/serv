import { Component } from '@angular/core';
import { Screen } from 'app/screen';
import { NavigationService } from 'smartux-client';

@Component({
  selector: 'menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent extends Screen {
    constructor(private navigationService: NavigationService) {
        super();
    }

    openAbout() {
        this.navigationService.go('about');
    }

}
