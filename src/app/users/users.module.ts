import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { UsersRoutingModule } from "./users-routing.module";
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserEditForm } from "./shared/user-edit.form";
import { UsersComponent } from "./users.component";


@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        UserEditComponent,
        UserListComponent,
        UserViewComponent,
        UsersComponent
    ],
    declarations: [
        UserEditComponent,
        UserListComponent,
        UserViewComponent,
        UsersComponent
    ],
    providers: [
        UserEditForm
    ]
})
export class UsersModule { }
