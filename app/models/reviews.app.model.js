import db from '../db/conn.js';

const _reviews = db.reviews;
const _customer = db.customer;

export default class reviews {
    constructor(reviews) {
        this.product_id = reviews.params.product_id;
        this.review = reviews.body.review;
        if (reviews.customer)
            this.customer_id = reviews.customer.id;
    }

    async addReview() {
        return await _reviews.create({
            review: this.review,
            productId: this.product_id,
            customerId: this.customer_id,
        });
    }
    async findReview() {
        return await _reviews.findAll({
            include: [{
                model: _customer,
                // through: {
                //     attributes: []
                // },
                attributes: ["id", "first_name", "last_name"],
            }],
            attributes: ["review"],
            where: {
                productId: this.product_id
            }
        });
    }
}