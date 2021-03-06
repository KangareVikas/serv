import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { SmartUxClient, config } from "smartux-client";
import { ComponentsModule } from "components";
import { Screens } from "./app.screens";
import { ClientApp } from "./app.component";
import { Hooks } from "./app.hooks";
import { GlobalData } from "./globaldata.service";
import { SearchPipe } from "./search.pipe";

@NgModule({
    bootstrap: [IonicApp],
    declarations: [ClientApp, SearchPipe, ...Screens.declarations],
    entryComponents: Screens.declarations,
    imports: [
        IonicModule.forRoot(ClientApp, config.ionic),
        SmartUxClient,
        ComponentsModule
    ],
    providers: [
        Hooks,
        GlobalData
    ],
    exports: [SearchPipe]
})
export class AppModule {
}
