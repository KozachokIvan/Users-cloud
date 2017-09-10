import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, HttpModule, RequestOptions, XHRBackend } from "@angular/http";

import { httpFactory } from "./http.factory";

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [

    ],
    providers: [
        {provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions]},
    ],
    exports: [
    ]
})
export class SharedModule { }
