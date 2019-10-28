/***  Generated file, do not change.  */
import { MenuComponent } from './menu/menu';
import { login_PhonePortrait } from '../pages/login/PhonePortrait/login';
import { home_PhonePortrait } from '../pages/home/PhonePortrait/home';
import { inserts_homelogo_PhonePortrait } from '../pages/inserts/homelogo/PhonePortrait/homelogo';
import { inserts_footer_PhonePortrait } from '../pages/inserts/footer/PhonePortrait/footer';
import { reportnewissue_PhonePortrait } from '../pages/reportnewissue/PhonePortrait/reportnewissue';
export class Screens {
  static declarations = [
    MenuComponent,
    login_PhonePortrait,
    home_PhonePortrait,
    inserts_homelogo_PhonePortrait,
    inserts_footer_PhonePortrait,
    reportnewissue_PhonePortrait
  ];
  static mapping = {
    'login': {
      PhonePortrait: login_PhonePortrait
    },
    'home': {
      PhonePortrait: home_PhonePortrait
    },
    'inserts_homelogo': {
      PhonePortrait: inserts_homelogo_PhonePortrait
    },
    'inserts_footer': {
      PhonePortrait: inserts_footer_PhonePortrait
    },
    'reportnewissue': {
      PhonePortrait: reportnewissue_PhonePortrait
    }
  }
}