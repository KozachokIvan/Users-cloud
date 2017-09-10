import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "../shared/user.model";
import { UsersService } from "../shared/users.service";

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

    user: User;

    constructor(private route: ActivatedRoute, private usersService: UsersService) {
        this.usersService.selectedUser = this.route.snapshot.data['user'];
    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
        this.usersService.user$.subscribe((user: User) => {
            this.user = user;
            this.usersService.selectedUser = this.user;
        });
    }

}
