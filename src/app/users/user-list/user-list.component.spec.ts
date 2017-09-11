import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";

import { UserListComponent } from './user-list.component';
import { mockUser } from "../../../../testing/index";

describe('UserListComponent', () => {

    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let debug: DebugElement;
    let element: HTMLElement;
    let link: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserListComponent
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {
                                users: [mockUser]
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        debug = fixture.debugElement.query(By.css('.username'));
        element = debug.nativeElement;

        link = fixture.debugElement.query(By.css('.details')).nativeElement.attributes['href'].value;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('data from resolver should be displayed in view', () => {
        expect(element.textContent).toBe('Test', 'first username is not Test');
    });

    it('routerLink should navigate to detail view each element', () => {
        let userId = component.users[0].id;
        expect(link).toBe('/view/' + userId, 'should navigate to UserView for first user');
    });
});
