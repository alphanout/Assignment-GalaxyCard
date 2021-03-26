import authenticateJWT from '../middleware/authJwt.js';
import validation from '../middleware/SchemaValidator.js';
import express from 'express';
import contOrder from "../controllers/order.controller.js";
const router = express.Router();

router.get("/:order_id", validation(), authenticateJWT, (req, res) => {
    contOrder.login(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.post("/", validation(), authenticateJWT, (req, res) => {
    contOrder.addOrder(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.get("/inCustomer", validation(), authenticateJWT, (req, res) => {
    contOrder.putAddress(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.get("/shortDetail/:order_id", validation(), authenticateJWT, (req, res) => {
    contOrder.putCreditCard(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

export default router;