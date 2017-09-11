import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "../shared/user.model";
import { UsersService } from "../shared/users.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

    user: User;
    userChangedSubscription = new Subscription();

    constructor(private route: ActivatedRoute, private usersService: UsersService) {

        // write user to service for user-edit component
        this.usersService.selectedUser = this.route.snapshot.data['user'];
    }

    ngOnInit() {

        // get initial user information from resolver
        this.user = this.route.snapshot.data['user'];

        // subscribe to change user information
        this.userChangedSubscription = this.usersService.user$.subscribe((user: User) => {
            this.user = user;

            // store changed user in service for user-edit component
            this.usersService.selectedUser = this.user;
        });
    }

    ngOnDestroy() {
        this.userChangedSubscription.unsubscribe();
    }

}
