import { GlobalData } from "./globaldata.service";
import { BaseScreen, DI, config } from "smartux-client";
config.onPauseTimeout = 20 * 60 * 1000;
config.loadingTimeout = 5 * 60 * 1000;
config.keepAliveTimeout = 3 * 60 * 1000;
export class Screen extends BaseScreen {
    protected global: GlobalData = DI.get<GlobalData>(GlobalData);

    logout(otherUserConnected?: boolean) {
        localStorage.removeItem('refresh_token');
        return super.logout(otherUserConnected);
    }

    ngOnInit() {
        if (window && window.screen && window.screen['orientation']) {
            window.screen.orientation.lock('portrait');
        }
        super.ngOnInit();
    }
}
