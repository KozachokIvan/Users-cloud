import { FormBuilder, Validators } from '@angular/forms';

import { User } from "./user.model";

export class UserEditForm {

    fb = new FormBuilder();

    getUserEditForm(user: User) {
        return this.fb.group({
            'name': [user.name, [Validators.required, Validators.minLength(3)]],
            'username': [user.username, [Validators.required, Validators.minLength(3)]],
            'email': [user.email, [Validators.required, Validators.minLength(3)]],
            'address': this.fb.group({
                'street': [user.address.street, [Validators.required, Validators.minLength(3)]],
                'suite': [user.address.suite, [Validators.required, Validators.minLength(3)]],
                'city': [user.address.city, [Validators.required, Validators.minLength(3)]],
                'zipcode': [user.address.zipcode, [Validators.required, Validators.minLength(3)]],
                'geo': this.fb.group({
                    'lat': [user.address.geo.lat, [Validators.required, Validators.minLength(3)]],
                    'lng': [user.address.geo.lng, [Validators.required, Validators.minLength(3)]],
                })
            }),
            'phone': [user.phone, [Validators.required, Validators.minLength(3)]],
            'website': [user.website, [Validators.required, Validators.minLength(3)]],
            'company': this.fb.group({
                'name': [user.company.name, [Validators.required, Validators.minLength(3)]],
                'catchPhrase': [user.company.catchPhrase, [Validators.required, Validators.minLength(3)]],
                'bs': [user.company.bs, [Validators.required, Validators.minLength(3)]],
            })
        });
    }
}
