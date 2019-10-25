/***  Generated file, do not change.  */
import { MenuComponent } from './menu/menu';
import { login_PhonePortrait } from '../pages/login/PhonePortrait/login';
import { login1_PhonePortrait } from '../pages/login1/PhonePortrait/login1';
export class Screens {
  static declarations = [
    MenuComponent,
    login_PhonePortrait,
    login1_PhonePortrait
  ];
  static mapping = {
    'login': {
      PhonePortrait: login_PhonePortrait
    },
    'login1': {
      PhonePortrait: login1_PhonePortrait
    }
  }
}