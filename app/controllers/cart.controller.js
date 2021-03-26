'use strict';
import _cart from '../models/cart.app.model.js';
export default class Cart {

    static async generateCart(req, res) {
        const newCart = new _cart(req);
        const rows = await newCart.new();
        if (rows)
            return res.status(200).json({
                id: rows.id
            });
        return res.status(400).json({
            error: 'unknow'
        });
    }
    static async add(req, res) {
        const cart = new _cart(req);
        const [rows, isCreated] = await cart.addItem();
        if (isCreated)
            return res.status(200).json({
                status: "Item added",
                quantity: rows.quantity
            });
        return res.status(200).json({
            status: "already added",
            quantity: rows.quantity
        });
    }

    static async get(req, res) {
        const cart = new _cart(req);
        const rows = await cart.findAll();
        if (rows && rows.products)
            return res.status(200).json({
                count: rows.products.length,
                products: rows.products
            });
        return res.status(200).json({
            count: 0,
        });
    }
    static async totalAmount(req, res) {
        const cart = new _cart(req);
        const rows = await cart.findAll();
        let totalAmount = 0;
        if (rows && rows.products) {
            rows.products.forEach(element => {
                totalAmount += element.cartItem.quantity * (element.price - element.discounted_price);
            });
        }
        return res.status(200).json({
            totalAmount: totalAmount
        });
    }
    static async update(req, res) {
        const cart = new _cart(req);
        const rows = await cart.updateItemQuantity();
        if (rows)
            return res.status(200).json({
                data: rows
            });
        return res.status(200).json({
            message: "cart doesn't have that product"
        });
    }
    static async empty(req, res) {
        const cart = new _cart(req);
        const rows = await cart.empty();
        if (rows)
            return res.status(200).json({
                message: "cart is empty now"
            });
        return res.status(200).json({
            message: "cart already empty"
        });
    }
    static async removeProduct(req, res) {
        const cart = new _cart(req);
        const rows = await cart.removeProduct();
        if (rows)
            return res.status(200).json({
                message: "product has been removed successfully"
            });
        return res.status(200).json({
            message: "cart doesn't have that product"
        });
    }
}