export class User {

    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;

    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.address = new Address(user.address);
        this.phone = user.phone;
        this.website = user.website;
        this.company = new Company(user.company);
    }
}

export class Address {

    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: GeoPosition;

    constructor(address) {
        this.street = address.street;
        this.suite = address.suite;
        this.city = address.city;
        this.zipcode = address.zipcode;
        this.geo = new GeoPosition(address.geo);
    }

    getFullAddress() {
        return this.zipcode + ' ' + this.city + ' ' + this.street + ' ' + this.suite;
    }
}

export class GeoPosition {

    lat: string;
    lng: string;

    constructor(position) {
        this.lat = position.lat;
        this.lng = position.lng;
    }

    getMapLink() {
        return 'https://www.google.com/maps/preview/@' + this.lat + ',' + this.lng + ',19z'
    }
}

export class Company {

    name: string;
    catchPhrase: string;
    bs: string;

    constructor(company) {
        this.name = company.name;
        this.catchPhrase = company.catchPhrase;
        this.bs = company.bs;
    }

    getCompanyInfo() {
        return this.name + ', ' +  this.catchPhrase + ', ' + this.bs;
    }
}
