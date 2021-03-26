'user strict';
import bcrypt from 'bcrypt';
import {
    BCRYPT_SALT_ROUNDS
} from '../config/auth.config.js';
import
db
from '../db/conn.js';

const _customer = db.customer;

export default class customer {
    constructor(customer) {
        this.password = customer.password;
        this.first_name = customer.first_name;
        this.last_name = customer.last_name;
        this.email = customer.email;
        this.phone_no = customer.phone_no;
        if (customer.customer)
            this.customer_id = customer.customer.id;
        this.credit_card = customer.credit_card;
    }

    async addCostumer() {
        const hashPassword = bcrypt.hashSync(this.password, BCRYPT_SALT_ROUNDS);
        const [user, created] = await _customer.findOrCreate({
            where: {
                // [Op.or]: [{
                //     email: this.email
                // }, {
                //     phone_no: this.phone_no
                // }],
                email: this.email,
            },
            defaults: {
                first_name: this.first_name,
                last_name: this.last_name,
                password: hashPassword,
            },
        });
        return [user, created];
    }
    async findCustomerByEmail() {
        return await _customer.findOne({
            where: {
                email: this.email
            }
        });
    }
    async findCustomerByPhone() {
        return await _customer.findOne({
            where: {
                phone_no: this.phone_no
            }
        });
    }
    async updateCreditCard() {
        return await _customer.update({
            credit_card: this.credit_card,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }

    async updatePhoneNo() {
        return await _customer.update({
            phone_no: this.phone_no,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }

    async updatePassword() {
        return await _customer.update({
            password: this.password,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }

    async updateEmail() {
        return await _customer.update({
            email: this.email,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }

    async updateLastName() {
        return await _customer.update({
            last_name: this.last_name,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }

    async updateFirstFame() {
        return await _customer.update({
            first_name: this.first_name,
        }, {
            where: {
                id: this.customer_id,
            }
        });
    }
}