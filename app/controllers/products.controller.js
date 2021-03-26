import products from '../models/products.app.model.js';
import reviews from '../models/reviews.app.model.js';
import send from 'koa-send';
import fs from 'fs';

export default class contProducts {
    contProducts() { }

    static async add(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.addproduct();
            ctx.request.body.category.forEach(e => {
                _products.addCategory(rows, e);
            });
            if (rows) {
                ctx.body = rows;
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }
    static async delete(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.deleteProduct();
            if (rows != 0) {
                ctx.body = "Product removed successfully";
            }
            else {
                ctx.body = "Product not found";
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }
    static async getAll(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.findAll();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "No Product Found";
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }

    static async getById(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.findById();
            if (rows) {
                if (fs.existsSync(`./DB/media/${rows.id}`)) {
                    ctx.attachment(`./DB/media/${rows.id}`);
                }
                ctx.body = rows;
            }
            else {
                ctx.body = "No Product Found";
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }

    static async getProductByCategoryId(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.findByCategoryId();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "No Category Found";
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }

    static async getReviews(ctx) {
        try {
            const _reviews = new reviews(ctx);
            const rows = await _reviews.findReview();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "No review Found";
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }

    static async addReviews(ctx) {
        try {
            const _reviews = new reviews(ctx);
            const rows = await _reviews.addReview();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "error";
            }
        }
        catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }
}