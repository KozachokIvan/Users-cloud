import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

import { User } from "../shared/user.model";
import { UserEditForm } from "../shared/user-edit.form";
import { UsersService } from "../shared/users.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

    form: FormGroup;
    user: User;
    changeInfo = new Subscription();

    constructor(private editForm: UserEditForm,
                private usersService: UsersService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    onSubmit() {
        this.changeInfo = this.usersService.changeUserInfo(this.user.id, this.form).subscribe(response => {
            this.usersService.userChanged(response);
            this.router.navigate(['../'], {relativeTo: this.route});
        }, function(error) {
            console.log(error);
        });
    }

    ngOnInit() {
        this.user = this.usersService.selectedUser;
        this.form = this.editForm.getUserEditForm(this.user);
    }

    ngOnDestroy() {
        this.changeInfo.unsubscribe();
    }

}
