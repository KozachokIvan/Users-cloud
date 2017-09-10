import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { User } from "../shared/user.model";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.users = this.route.snapshot.data['users'];
    }

}
