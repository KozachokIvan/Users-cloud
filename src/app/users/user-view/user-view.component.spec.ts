import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Http } from "@angular/http";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { UserViewComponent } from "./user-view.component";
import { UsersModule } from "../users.module";
import { mockHttpProvider, mockUser } from "../../../../testing/index";
import { UsersService } from "../shared/users.service";
import { Observable } from "rxjs/Observable";

describe('UsersViewComponent', () => {

    let component: UserViewComponent;
    let fixture: ComponentFixture<UserViewComponent>;
    let debug: DebugElement;
    let element: HTMLElement;
    let editButton: DebugElement;
    let linkDe: DebugElement;
    let link;
    let usersService;

    let mockUsersService = {
        user$: Observable.of(mockUser)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                UsersModule,
                RouterTestingModule
            ],
            providers: [
                { provide: Http, useValue: mockHttpProvider },
                { provide: UsersService, useValue: mockUsersService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                user: mockUser
                            }
                        }
                    }
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserViewComponent);
        component = fixture.componentInstance;

        debug = fixture.debugElement.query(By.css('.username'));
        element = debug.nativeElement;
        editButton =  fixture.debugElement.query(By.css('.edit'));
        linkDe = fixture.debugElement.query(By.css('.edit'));
        link = linkDe.nativeElement.getAttribute('routerLink');

        usersService = fixture.debugElement.injector.get(UsersService);
        fixture.detectChanges();
    });

    it('should create', (() => {
        expect(component).toBeTruthy();
    }));

    it('data from resolver should be displayed in view', (() => {
        fixture.detectChanges();
        expect(element.textContent).toContain('Test', 'user should be displayed');
    }));

    it('button should go to edit page', () => {
        expect(link).toBe('edit', 'link should go to edit');
    });

    it('data in view should be changed on user$ changes', async((done) => {
        let testUser = mockUser;
        testUser.name = 'Test2';
        spyOn(usersService, 'user$').and.returnValue(Observable.of(testUser));
        fixture.detectChanges();
        expect(element.textContent).toBe(testUser.name, 'username should be Test2');
    }));

});
