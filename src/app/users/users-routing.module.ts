import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { UserByIdResolver, UserListResolver, UsersService } from "./shared/users.service";
import { UserListComponent } from "./user-list/user-list.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { UserEditComponent } from "./user-edit/user-edit.component";

const usersRoutes: Routes = [
    {path: 'list', component: UserListComponent, resolve: {users: UserListResolver}},
    {path: 'view', children: [
        {path: ':id', component: UserViewComponent, resolve: {user: UserByIdResolver}, children: [
            {path: 'edit', component: UserEditComponent},
        ]},
        {path: '', redirectTo: '/list', pathMatch: 'full'}
    ]},
    {path: '**', redirectTo: 'list'},
];

@NgModule({
    imports: [
        RouterModule.forChild(usersRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        UserListResolver,
        UserByIdResolver,
        UsersService
    ]
})
export class UsersRoutingModule {

}
