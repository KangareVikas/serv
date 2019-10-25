/***  Generated file, do not change.  */
import { MenuComponent } from './menu/menu';
import { login_PhonePortrait } from '../pages/login/PhonePortrait/login';
import { home_PhonePortrait } from '../pages/home/PhonePortrait/home';
export class Screens {
  static declarations = [
    MenuComponent,
    login_PhonePortrait,
    home_PhonePortrait
  ];
  static mapping = {
    'login': {
      PhonePortrait: login_PhonePortrait
    },
    'home': {
      PhonePortrait: home_PhonePortrait
    }
  }
}