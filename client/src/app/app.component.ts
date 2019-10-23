import { Component, Inject } from '@angular/core';
import { Screen } from './screen';
import { Screens } from './app.screens';
import * as mocks from 'mocks/index';
import { Hooks } from './app.hooks';
import { Bootstrap, TBootstrap } from 'smartux-client';

@Component({
  templateUrl: 'app.html'
})
export class ClientApp extends Screen {

  constructor(@Inject(Bootstrap) bootstrap: TBootstrap, hooks: Hooks) {
    super();
    bootstrap(hooks, Screens.mapping, mocks);
  }

}

