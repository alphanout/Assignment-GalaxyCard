'use strict';
import customer from '../models/customer.app.model.js';
import address from '../models/address.app.model.js';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    secret
} from "../config/auth.config.js";
export default class contCustomer {
    contCustomer() {}
    static async addCustomer(req, res) {
        var new_customer = new customer(req.body);
        if (!new_customer.first_name || !new_customer.last_name || !new_customer.password)
            res.status(400).send({
                error: true,
                message: 'Please provide all relevant data'
            });
        else {
            const [user, created] = await new_customer.addCostumer();
            if (user !== null) {
                if (created)
                    return res.status(200).json({
                        message: "signup successful"
                    });
                else
                    return res.status(400).json({
                        message: "email already exist"
                    });
            } else {
                return res.status(500).send(res);
            }
        }
    }
    static async login(req, res) {
        var _customer = new customer(req.body);
        if (!_customer.password || !_customer.phone_no || !_customer.email) res.status(400).send({
            error: true,
            message: 'Please provide all relevant data'
        });
        else if (!_customer.phone_no && validator.isMobilePhone) res.status(400).send({
            error: true,
            message: 'invalid phone no.'
        });
        else {
            const checklogin = await _customer.findCustomerByEmail();
            if (checklogin !== null) {
                if (bcrypt.compareSync(_customer.password, checklogin.password)) {
                    // console.log(`user found & logged in ${checklogin.id}`);
                    var token = jwt.sign({
                        id: checklogin.id,
                        // email: checklogin.email
                    }, secret, {
                        expiresIn: 86400,
                    });
                    return res.status(200).json({
                        auth: true,
                        id: checklogin.id,
                        bearer: token,
                        message: 'sign in successful'
                    });
                } else {
                    return res.status(400).json({
                        error: "password does not match"
                    });
                }
            } else {
                return res.status(400).json({
                    error: "user not found"
                });
            }
        }
    }

    static async putAddress(req, res) {
        //TODO: validatebody
        var _address = new address(req);
        const [user, created] = await _address.addAddress();
        if (created) return res.status(200).json({
            message: 'Address added succesfully'
        });
        else return res.status(200).json({
            message: 'Address updated succesfully'
        });
    }

    static async putCreditCard(req, res) {
        //TODO: validatebody
        req.body.customer = req.customer;
        var _customer = new customer(req.body);
        if (validator.isCreditCard(_customer.credit_card) === true) {
            const updated = await _customer.updateCreditCard();
            if (updated > 0) return res.status(200).json({
                message: 'CreditCard updated succesfully'
            });
            else return res.status(200).json({
                message: 'User not found'
            });
        } else return res.status(400).send({
            error: "Invalid credit card"
        });
    }
}