import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Http } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";

import { UserEditComponent } from './user-edit.component';
import { UsersModule } from "../users.module";
import { MockActivatedRoute, mockHttpProvider, mockUser } from "../../../../testing/index";
import { UsersService } from "../shared/users.service";
import { Observable } from "rxjs/Observable";


class RouterStub {
    navigate(url: string) { return url; };
}

describe('UserEditComponent', () => {

    let component: UserEditComponent;
    let fixture: ComponentFixture<UserEditComponent>;
    let usersService;
    let saveButton: HTMLElement;
    let cancelButtonUrl: string;
    let changeUserInfoSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                UsersModule,
                RouterTestingModule.withRoutes([{path: '/'}]),
            ],
            providers: [
                { provide: Http, useValue: mockHttpProvider },
                { provide: ActivatedRoute, useClass: MockActivatedRoute },
                { provide: Router, useClass: RouterStub},
                UsersService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserEditComponent);
        component = fixture.componentInstance;
        usersService = fixture.debugElement.injector.get(UsersService);
        usersService.selectedUser = mockUser;
        fixture.detectChanges();
        changeUserInfoSpy = spyOn(usersService, 'changeUserInfo').and.returnValue(Observable.of(mockUser));
        saveButton = fixture.debugElement.query(By.css('.save')).nativeElement;
        cancelButtonUrl = fixture.debugElement.query(By.css('.cancel')).nativeElement.getAttribute('routerLink');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('save button should change user info', () => {
        saveButton.click();
        expect(changeUserInfoSpy).toHaveBeenCalled();
    });

    it('cancel button should have routerLink to ../', () => {
        expect(cancelButtonUrl).toEqual('../');
    });

    it('should tell ROUTER to navigate after changeUserInfo',
        inject([Router], (router: Router) => {
            const routerSpy = spyOn(router, 'navigate');
            saveButton.click();
            const navArgs = routerSpy.calls.first().args[0][0];
            expect(navArgs).toBe('../', 'should nav to HeroDetail for first hero');
        })
    );


});
