import { DebugElement, Type } from "@angular/core";
import { User } from "../src/app/users/shared/user.model";
import { MockBackend } from "@angular/http/testing";
import { BaseRequestOptions, Http } from "@angular/http";
import { ActivatedRoute, ActivatedRouteSnapshot, Data, ParamMap, Params, Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs/Observable";

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
    left:  { button: 0 },
    right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}

export const mockUser = new User({
    "id": 0,
    "name": "Test",
    "username": "Test",
    "email": "Test",
    "address": {
        "street": "Test",
        "suite": "Test",
        "city": "Test",
        "zipcode": "Test",
        "geo": {
            "lat": "Test",
            "lng": "Test"
        }
    },
    "phone": "Test",
    "website": "Test",
    "company": {
        "name": "Test",
        "catchPhrase": "Test",
        "bs": "Test"
    }
});


export const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

export class MockActivatedRoute implements ActivatedRoute{
    snapshot : ActivatedRouteSnapshot;
    url : Observable<UrlSegment[]>;
    params : Observable<Params>;
    queryParams : Observable<Params>;
    fragment : Observable<string>;
    data : Observable<Data>;
    outlet : string;
    component : Type<any>|string;
    routeConfig : Route;
    root : ActivatedRoute;
    parent : ActivatedRoute;
    firstChild : ActivatedRoute;
    children : ActivatedRoute[];
    pathFromRoot : ActivatedRoute[];
    paramMap: Observable<ParamMap>;
    queryParamMap: Observable<ParamMap>;
    toString() : string{
        return "";
    };
}
