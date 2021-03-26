'user strict';
import
db
from '../db/conn.js';

const _address = db.address;

export default class address {
    constructor(address) {
        let customer = address.customer;
        address = address.body;
        this.address_1 = address.address_1;
        this.address_2 = address.address_2;
        this.city = address.city;
        this.region = address.region;
        this.postal_code = address.postal_code;
        this.country = address.country;
        this.shipping_region_id = address.shipping_region_id;
        this.customer_id = customer.id;
    }

    async addAddress() {
        const [user, created] = await _address.findOrCreate({
            where: {
                customerId: this.customer_id,
            },
            defaults: {
                address_1: this.address_1,
                address_2: this.address_2,
                city: this.city,
                region: this.region,
                postal_code: this.postal_code,
                country: this.country,
                shipping_region_id: this.shipping_region_id,
            },
        });
        if (!created) {
            await _address.update({
                address_1: this.address_1,
                address_2: this.address_2,
                city: this.city,
                region: this.region,
                postal_code: this.postal_code,
                country: this.country,
                shipping_region_id: this.shipping_region_id,
                customerId: this.customer_id,
            }, {
                where: {
                    customerId: this.customer_id,
                }
            });
        }
        return [user, created];
    }
    async findAddressById() {
        return await _address.findOne();
    }
}