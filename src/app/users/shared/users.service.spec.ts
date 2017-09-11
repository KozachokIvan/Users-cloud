import { BaseRequestOptions, Http, ResponseOptions } from "@angular/http";
import { async, inject, TestBed } from "@angular/core/testing";
import { MockBackend, MockConnection } from "@angular/http/testing";
import { Response } from '@angular/http';
import { FormGroup } from "@angular/forms";

import { mockUser } from "../../../../testing/index";
import { UsersService } from "./users.service";

describe('UsersService', () => {

    let subject: UsersService = null;
    let backend: MockBackend = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                UsersService
            ]
        }).compileComponents();
    }));

    beforeEach(inject([UsersService, MockBackend], (usersService: UsersService, mockBackend: MockBackend) => {
        subject = usersService;
        backend = mockBackend;
    }));

    it('#getUserList should call endpoint and return it\'s result', (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: [mockUser]
            });
            connection.mockRespond(new Response(options));
        });

        subject
            .getUserList()
            .subscribe((response) => {
                expect(response).toEqual([mockUser]);
                done();
            });
    });

    it('#getUserById should call endpoint and return it\'s result', (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: mockUser
            });
            connection.mockRespond(new Response(options));
        });

        subject
            .getUserById(0)
            .subscribe((response) => {
                expect(response).toEqual(mockUser);
                done();
            });
    });

    it('#changeUserInfo should call endpoint and return it\'s result', (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: mockUser
            });
            connection.mockRespond(new Response(options));
        });

        subject
            .changeUserInfo(0, new FormGroup({}))
            .subscribe((response) => {
                expect(response).toEqual(mockUser);
                done();
            });
    });



});
