import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { FormGroup } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class UsersService {

    private user = new Subject<User>();
    user$ = this.user.asObservable();
    selectedUser: User;

    constructor(private http: Http) {}

    userChanged(user: User) {
        this.user.next(user);
    }

    getUserList(): Observable<User[]> {
        return this.http.get('/users', {params: {_limit: 20}})
            .map(response =>  response.json());
    }

    getUserById(id: number): Observable<any> | any {
        return this.http.get(`/users/${id}`)
            .map(response =>  new User(response.json()));
    }

    changeUserInfo(id: number, form: FormGroup): Observable<User> {
        return this.http.put(`/users/${id}`, form.value)
            .map(response =>  new User(response.json()));
    }
}

@Injectable()
export class UserListResolver implements Resolve<User[]> {

    constructor(private usersService: UsersService) {}

    resolve(): Observable<User[]> {
        return this.usersService.getUserList();
    }
}

@Injectable()
export class UserByIdResolver implements Resolve<User> {

    constructor(private usersService: UsersService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> | any {
        return this.usersService.getUserById(route.params['id'])
            .catch(() => {
                this.router.navigate(['/list']);
                return Observable.of(null);
            });
    }
}

