declare module 'app/globaldata.service' {
	export class GlobalData {
	}

}
declare module 'app/screen' {
	import { GlobalData } from 'app/globaldata.service';
	import { BaseScreen } from 'smartux-client';
	export class Screen extends BaseScreen {
	    protected global: GlobalData;
	}

}
declare module 'app/menu/menu' {
	import { Screen } from 'app/screen';
	export class MenuComponent extends Screen {
	}

}
declare module 'app/app.screens' {
	/***  Generated file, do not change.  */
	import { MenuComponent } from 'app/menu/menu';
	export class Screens {
	    static declarations: typeof MenuComponent[];
	    static mapping: {};
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
declare module 'app/app.module' {
	export class AppModule {
	}

}
