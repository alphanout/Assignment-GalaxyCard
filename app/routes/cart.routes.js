import authenticateJWT from '../middleware/authJwt.js';
import validation from '../middleware/SchemaValidator.js';
import express from 'express';
import contCart from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/generateUniqueId", validation(), authenticateJWT, (req, res) => {
    contCart.generateCart(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.post("/add", validation(), authenticateJWT, (req, res) => {
    contCart.add(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.get("/:cart_id", validation(), authenticateJWT, (req, res) => {
    contCart.get(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.put("/update/:item_id", validation(), authenticateJWT, (req, res) => {
    contCart.update(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.delete("/empty/:cart_id", validation(), authenticateJWT, (req, res) => {
    contCart.empty(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.get("/totalAmount/:cart_id", validation(), authenticateJWT, (req, res) => {
    contCart.totalAmount(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.delete("/removeProduct/:item_id", validation(), authenticateJWT, (req, res) => {
    contCart.removeProduct(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

export default router;