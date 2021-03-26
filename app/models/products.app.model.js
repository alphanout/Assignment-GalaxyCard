import db from '../db/conn.js';
const _products = db.products;
const _category = db.category;
export default class products {
    constructor(products) {
        this.name = products.request.body.name;
        this.description = products.request.body.description;
        this.price = products.request.body.price;
        this.id = products.params.product_id;
        this.category_id = products.params.category_id;
    }
    async addproduct() {
        if (this.name && this.description && this.price)
            return await _products.create({
                name: this.name,
                description: this.description,
                price: this.price
            });
        else {
            throw "Request body is not properly defined";
        }
    }
    async addCategory(rows, id) {
        let t = await _category.findByPk(id)
        t.addProduct(rows);
    }

    async deleteProduct() {
        return await _products.destroy({
            where: {
                id: this.id
            }
        });
    }

    async findAll() {
        return await _products.findAll({
            attributes: ["id", "name", "description", "price"]
        });
    }
    async findById() {
        return await _products.findByPk(this.id, {
            include: [{
                model: _category,
                through: {
                    attributes: []
                },
                attributes: ["name"],
            }],
            attributes: ["id", "name", "description", "price"]
        });
    }
    async findByCategoryId() {

        return await _category.findAll({
            include: [{
                model: _products,
                as: 'products',
                through: {
                    attributes: []
                },
                attributes: ["id", "name", "description", "price"],
            }],
            where: {
                id: this.category_id
            },
            attributes: ["name", "description"]
        });
    }
}