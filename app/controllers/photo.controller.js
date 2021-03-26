import products from '../models/products.app.model.js';
import fs from 'fs';
import sharp from 'sharp';

const dir = "./DB/media";
export default class contPhoto {
    contPhoto() { }

    static async addPhoto(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.findById();
            if (rows) {
                if (!fs.existsSync(dir + '/' + rows.id)) fs.mkdirSync(dir + '/' + rows.id);
                if (ctx.request.files && ctx.request.files['']) {
                    if (typeof ctx.request.files[''] == Array)
                        ctx.request.files[''].forEach(element => {
                            fs.copyFileSync(element.path, `${dir}/${rows.id}/${element.path.substring(8) + element.name}`);
                        });
                    else {
                        fs.copyFileSync(ctx.request.files[''].path, `${dir}/${rows.id}/${ctx.request.files[''].path.substring(8) + ctx.request.files[''].name}`);
                    }
                }
                else { ctx.status = 422; return; }
                ctx.body = "Photo added";
            } else ctx.body = "Product Not Found";
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }
    static async delete(ctx) {
        try {
            const _products = new products(ctx);
            const rows = await _products.findById();
            if (rows) {
                let idd = ctx.params.photo_id;
                if (fs.existsSync(dir + '/' + rows.id)) {
                    fs.readdir(dir + '/' + rows.id, (err, file) => {
                        file.forEach(i => {
                            if (i == idd)
                                fs.unlinkSync(dir + '/' + rows.id + '/' + i);
                        })
                    })
                }
                ctx.body = "Photo removed";
            } else {
                ctx.body = "Product Not Found";
            }
        } catch (error) {
            console.log(error);
            ctx.status = 404;
        }
    }

}