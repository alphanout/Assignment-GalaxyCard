import category from '../models/category.app.model.js';
/*
    Implementation of Routes
*/


export default class contCategory {
    contCategory() { }

    static async add(ctx) {
        try {
            const _category = new category(ctx);
            const rows = await _category.addCategory();
            if (rows) {
                ctx.body = rows;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
        }
    }

    static async delete(ctx) {
        try {
            const _category = new category(ctx);
            const rows = await _category.deleteCategory();
            if (rows != 0) {
                ctx.body = "Category removed successfully";
            }
            else {
                ctx.body = "Category not found";
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }

    static async getAll(ctx) {
        try {
            const _category = new category(ctx);
            const rows = await _category.findAll();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "No Category Found";
            }
        } catch (err) {
            console.log(err);
            ctx.status = 404;
        }
    }

    static async getById(ctx) {
        try {
            const _category = new category(ctx);
            const rows = await _category.findById();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "Category Id doesn't exist";
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async getCategoryByProductId(ctx) {
        try {
            const _category = new category(ctx);
            const rows = await _category.findByProductId();
            if (rows) {
                ctx.body = rows;
            }
            else {
                ctx.body = "Product Id doesn't exist";
            }
        } catch (err) {
            console.log(err);
        }
    }

}