'use strict';
import customer from '../models/customer.app.model.js';
export default class contCustomer {
    contCustomer() {}
    static async updateCustomer(req, res) {
        req.body.customer = req.customer;
        const _customer = new customer(req.body);
        if (_customer.first_name) {
            await _customer.updateFirstFame();
        }
        if (_customer.last_name) {
            await _customer.updateLastName();
        }
        if (_customer.password) {
            await _customer.updatePassword();
        }
        if (_customer.email) {
            await _customer.updateEmail();
        }
        if (_customer.phone_no) {
            await _customer.updatePhoneNo();
        }
        return res.status(200).send({
            message: "Details updated successfully"
        });
    }
}