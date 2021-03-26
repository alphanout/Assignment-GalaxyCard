import Koa from 'koa';
import Router from 'koa-router';
import Logger from 'koa-logger';
import categoryRoutes from "./app/routes/category.routes.js";
import productsRoutes from "./app/routes/products.routes.js";
import bodyParser from "koa-body";

const app = new Koa();
const router = new Router();

app.use(bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true
}));


app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err.status)
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});

// Response to GET requests
router.get('/', async (ctx) => {
    ctx.body = 'Hello, World!\n';
});

// Logging
app.use(Logger());

// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());
app.use(categoryRoutes.routes()).use(categoryRoutes.allowedMethods());
app.use(productsRoutes.routes()).use(productsRoutes.allowedMethods());

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`running on port ${PORT}`));