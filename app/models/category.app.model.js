import db from '../db/conn.js';
const _category = db.category;
const _products = db.products;

/**
 * ORM models for Category
 */

export default class category {
    constructor(category) {
        this.name = category.request.body.name;
        this.description = category.request.body.description;
        this.id = category.params.category_id;
        this.product_id = category.params.product_id;

    }

    async addCategory() {
        if (this.name && this.description)
            return await _category.create({
                name: this.name,
                description: this.description,
            });
        else {
            throw "Request body is not properly defined";
        }
    }

    async deleteCategory() {
        return await _category.destroy({
            where: {
                id: this.id
            }
        });
    }

    async findAll() {
        return await _category.findAll({
            attributes: ["id", "name", "description"]
        });
    }
    async findById() {
        return await _category.findByPk(this.id, {
            attributes: ["id", "name", "description"]
        });
    }

    async findByProductId() {
        return await _products.findAll({
            include: [{
                model: _category,
                through: {
                    attributes: []
                },
                attributes: ["id", "name", "description"],
            }],
            where: {
                id: this.product_id
            },
            attributes: ["id", "name", "description", "price", "discounted_price"]
        });
    }
}