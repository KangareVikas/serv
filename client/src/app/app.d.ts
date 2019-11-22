declare module 'app/globaldata.service' {
	export class GlobalData {
	    /**
	     * Put any global data values you want to use across screens here, e.g.:
	     *
	     * myValue: string;
	     *
	     * Use "global.myValue" to refer to it in your screen template, or this.global.myValue in your controller.
	     */
	    photo: any;
	}

}
declare module 'app/screen' {
	import { GlobalData } from 'app/globaldata.service';
	import { BaseScreen } from 'smartux-client';
	export class Screen extends BaseScreen {
	    protected global: GlobalData;
	    ngOnInit(): void;
	}

}
declare module 'app/menu/menu' {
	import { Screen } from 'app/screen';
	export class MenuComponent extends Screen {
	    doChat(): void;
	    doCall(): void;
	}

}
declare module 'app/app.screens' {
	/***  Generated file, do not change.  */
	import { MenuComponent } from 'app/menu/menu';
	import { login_PhonePortrait } from 'app/../pages/login/PhonePortrait/login';
	import { home_PhonePortrait } from 'app/../pages/home/PhonePortrait/home';
	import { inserts_homelogo_PhonePortrait } from 'app/../pages/inserts/homelogo/PhonePortrait/homelogo';
	import { inserts_footer_PhonePortrait } from 'app/../pages/inserts/footer/PhonePortrait/footer';
	import { incident_subcategories_PhonePortrait } from 'app/../pages/incident/subcategories/PhonePortrait/subcategories';
	import { incident_categories_PhonePortrait } from 'app/../pages/incident/categories/PhonePortrait/categories';
	import { incident_newissue_PhonePortrait } from 'app/../pages/incident/newissue/PhonePortrait/newissue';
	import { request_services_PhonePortrait } from 'app/../pages/request/services/PhonePortrait/services';
	import { request_subservices_PhonePortrait } from 'app/../pages/request/subservices/PhonePortrait/subservices';
	import { request_newrequest_PhonePortrait } from 'app/../pages/request/newrequest/PhonePortrait/newrequest';
	import { articles_findarticle_PhonePortrait } from 'app/../pages/articles/findarticle/PhonePortrait/findarticle';
	import { articles_viewarticle_PhonePortrait } from 'app/../pages/articles/viewarticle/PhonePortrait/viewarticle';
	import { tickets_mytickets_PhonePortrait } from 'app/../pages/tickets/mytickets/PhonePortrait/mytickets';
	import { tickets_viewincident_PhonePortrait } from 'app/../pages/tickets/viewincident/PhonePortrait/viewincident';
	import { finduser_PhonePortrait } from 'app/../pages/finduser/PhonePortrait/finduser';
	import { findticket_PhonePortrait } from 'app/../pages/findticket/PhonePortrait/findticket';
	import { about_PhonePortrait } from 'app/../pages/about/PhonePortrait/about';
	import { settings_PhonePortrait } from 'app/../pages/settings/PhonePortrait/settings';
	import { del1_PhonePortrait } from 'app/../pages/del1/PhonePortrait/del1';
	import { setup_PhonePortrait } from 'app/../pages/setup/PhonePortrait/setup';
	import { initialize_PhonePortrait } from 'app/../pages/initialize/PhonePortrait/initialize';
	export class Screens {
	    static declarations: (typeof MenuComponent | typeof inserts_homelogo_PhonePortrait | typeof incident_newissue_PhonePortrait | typeof setup_PhonePortrait | typeof initialize_PhonePortrait)[];
	    static mapping: {
	        'login': {
	            PhonePortrait: typeof login_PhonePortrait;
	        };
	        'home': {
	            PhonePortrait: typeof home_PhonePortrait;
	        };
	        'inserts_homelogo': {
	            PhonePortrait: typeof inserts_homelogo_PhonePortrait;
	        };
	        'inserts_footer': {
	            PhonePortrait: typeof inserts_footer_PhonePortrait;
	        };
	        'incident_subcategories': {
	            PhonePortrait: typeof incident_subcategories_PhonePortrait;
	        };
	        'incident_categories': {
	            PhonePortrait: typeof incident_categories_PhonePortrait;
	        };
	        'incident_newissue': {
	            PhonePortrait: typeof incident_newissue_PhonePortrait;
	        };
	        'request_services': {
	            PhonePortrait: typeof request_services_PhonePortrait;
	        };
	        'request_subservices': {
	            PhonePortrait: typeof request_subservices_PhonePortrait;
	        };
	        'request_newrequest': {
	            PhonePortrait: typeof request_newrequest_PhonePortrait;
	        };
	        'articles_findarticle': {
	            PhonePortrait: typeof articles_findarticle_PhonePortrait;
	        };
	        'articles_viewarticle': {
	            PhonePortrait: typeof articles_viewarticle_PhonePortrait;
	        };
	        'tickets_mytickets': {
	            PhonePortrait: typeof tickets_mytickets_PhonePortrait;
	        };
	        'tickets_viewincident': {
	            PhonePortrait: typeof tickets_viewincident_PhonePortrait;
	        };
	        'finduser': {
	            PhonePortrait: typeof finduser_PhonePortrait;
	        };
	        'findticket': {
	            PhonePortrait: typeof findticket_PhonePortrait;
	        };
	        'about': {
	            PhonePortrait: typeof about_PhonePortrait;
	        };
	        'settings': {
	            PhonePortrait: typeof settings_PhonePortrait;
	        };
	        'del1': {
	            PhonePortrait: typeof del1_PhonePortrait;
	        };
	        'setup': {
	            PhonePortrait: typeof setup_PhonePortrait;
	        };
	        'initialize': {
	            PhonePortrait: typeof initialize_PhonePortrait;
	        };
	    };
	}

}
declare module 'app/app.hooks' {
	import { AppHooks } from 'smartux-client';
	export class Hooks extends AppHooks {
	    /**
	    * Initial parameters to send to the server.
	    */
	    getServerInitParams(): Promise<any>;
	    /**
	     * Initialize the UI with data from the server.
	     */
	    initializeUI(params: any): void;
	    /**
	     * Override what happens when going to a new screen.
	     */
	    overrideStateHandler(oldScreen: string, newScreen: string, data: any): string;
	    /**
	     * Override what happens when a custom URL scheme is called.
	     *
	     * type - 'event' is currently the only supported type.
	     * name - Name of event, e.g. 'login.submit'
	     * data - JSON object containing URL data.
	     *
	     * Returns: true - Continue with normal flow, e.g. if type is event, send the event to the server.
	     *          false - Don't continue with the normal flow.
	     */
	    interceptCustomURLScheme(type: string, name: string, data: any): Promise<boolean>;
	    /**
	      * Override what happens when there is a push notification.
	      *
	      * data - JSON object containing Notification data
	      *
	      * Returns: true - Continue with normal flow, e.g. if type is event, send the event to the server.
	      *          false - Don't continue with the normal flow.
	      */
	    onPushNotification(data: any): Promise<boolean>;
	    /**
	     * Error when an internal Push Notification error occurs and the cache is aborted.
	     */
	    onPushNotificationError(e: Error): Promise<void>;
	    /**
	     * Override what happens when on a file download event
	     * params - information about the download
	     * url - the url to download the file
	     * Returns: true - Continue with normal flow, e.g. download and try to open with
	     *                   the default application/ social share plugin
	     *          false - Don't continue with the normal flow.
	     */
	    onDownloadFile(params: any, url: any): Promise<boolean>;
	    /**
	     * Override what happens when the back button is pressed (Android)
	     * Returns: true - continue with the normal flow, e.g. exit the application
	     *          false - Don't continue with the normal flow.
	     */
	    onBackButton(): boolean;
	    /**
	     * Override what happens when the application enters the background
	     * Returns: true - continue witht the normal flow, e.g disconnect after the time
	     *                  specified in config.ts
	     *          false - don't continue with the normal flow.
	    */
	    onPause(): boolean;
	    /**
	     * Override what happens when the application enters the foreground
	     * Returns: true - continue witht the normal flow, e.g reconnect if disconnected
	     *          false - don't continue with the normal flow.
	    */
	    onResume(): boolean;
	    /**
	     * Override what happens when a request comes in to switch applications
	     * Returns: true - continue with the normal flow, e.g prompt the user
	     *          false - don't prompt the user, ignore the request
	     */
	    onSwitchSessionRequest(): boolean;
	}

}
declare module 'app/app.component' {
	import { Screen } from 'app/screen';
	import { Hooks } from 'app/app.hooks';
	import { TBootstrap } from 'smartux-client';
	export class ClientApp extends Screen {
	    constructor(bootstrap: TBootstrap, hooks: Hooks);
	}

}
declare module 'app/search.pipe' {
	import { PipeTransform } from 'app/@angular/core';
	export class SearchPipe implements PipeTransform {
	    transform(items: any[], terms: string, field: string): any[];
	}

}
declare module 'app/app.module' {
	export class AppModule {
	}

}
