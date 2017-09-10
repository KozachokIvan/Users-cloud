import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NavComponent } from './nav/nav.component';
import { throwIfAlreadyLoaded } from "./module-import-guard";

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavComponent
    ],
    declarations: [
        NavComponent
    ],
    providers: []
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
