import Router from 'koa-router';
import contProducts from "../controllers/products.controller.js";
import contPhoto from "../controllers/photo.controller.js";
import auth from "koa-basic-auth";
import { credentials } from "../config/auth.config.js";

const router = new Router();

router.post("/products", auth(credentials), contProducts.add);

router.delete("/products/:product_id([0-9]*)", auth(credentials), contProducts.delete);

router.post("/products/:product_id([0-9]*)", auth(credentials), contPhoto.addPhoto);

router.delete("/products/:product_id([0-9]*)/:photo_id", auth(credentials), contPhoto.delete);

router.get("/products/:product_id([0-9]*)", contProducts.getById);

router.get("/products", contProducts.getAll);

router.get("/products/inCategory/:category_id([0-9]*)", contProducts.getProductByCategoryId);

router.get("/:product_id([0-9]*)/reviews", contProducts.getReviews);

router.post("/:product_id([0-9]*)/reviews", contProducts.addReviews);

export default router;