import Router from 'koa-router';
import contCategory from "../controllers/category.controller.js";
import auth from "koa-basic-auth";
import { credentials } from "../config/auth.config.js";
const router = new Router();

// List of categories
router.get("/categories", contCategory.getAll);

router.post("/categories", auth(credentials), contCategory.add);

router.delete("/categories/:category_id([0-9]*)", auth(credentials), contCategory.delete);

//Category By Id
router.get("/categories/:category_id([0-9]*)", contCategory.getById);

//Categories of a product by product Id
router.get("/categories/inProduct/:product_id([0-9]*)", contCategory.getCategoryByProductId);

export default router;