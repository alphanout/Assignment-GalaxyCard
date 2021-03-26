'user strict';
import
db
from '../db/conn.js';

const _cart = db.cart;
const _cartItem = db.cartItem;
const _products = db.products;

export default class cart {
    constructor(cart) {
        if (cart.customer)
            this.customer_id = cart.customer.id;
        this.id = cart.body.cart_id;
        if (!this.id)
            this.id = cart.params.cart_id;
        this.product_id = cart.body.product_id;
        this.quantity = cart.body.quantity;
        if (!this.product_id)
            this.product_id = cart.params.item_id;
    }

    async new() {
        return await _cart.create({
            customerId: this.customer_id
        });
    }

    async addItem() {
        return await _cartItem.findOrCreate({
            where: {
                cartId: this.id,
                productId: this.product_id,
            },
        });
    }

    async findAll() {
        return await _cart.findOne({
            include: [{
                model: _products,
                through: {
                    attributes: ["quantity"]
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }],
            where: {
                customerId: this.customer_id,
                id: this.id,
            },
            attributes: []
        });
    }
    async removeProduct() {
        return await _cartItem.destroy({
            where: {
                productId: this.product_id,
                cartId: this.id,
            },
        });
    }
    async empty() {
        return await _cartItem.destroy({
            where: {
                cartId: this.id,
            },
        });
    }
    async updateItemQuantity() {
        return await _cartItem.update({
            'quantity': this.quantity
        }, {
            where: {
                productId: this.product_id,
                cartId: this.id,
            },
        });
    }
}