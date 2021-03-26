import authenticateJWT from '../middleware/authJwt.js';
import verifySignup from '../middleware/verifySignup.js';
import validation from '../middleware/SchemaValidator.js';
import express from 'express';
import contCustomer from "../controllers/customers.controller.js";
const router = express.Router();

router.post("/login", validation(), (req, res) => {
    contCustomer.login(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});
router.post("/", validation(), verifySignup, (req, res) => {
    contCustomer.addCustomer(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.put("/address", validation(), authenticateJWT, (req, res) => {
    contCustomer.putAddress(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

router.put("/creditCard", validation(), authenticateJWT, (req, res) => {
    contCustomer.putCreditCard(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

export default router;