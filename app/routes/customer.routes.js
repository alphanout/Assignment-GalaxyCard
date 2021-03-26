import express from 'express';
import authenticateJWT from '../middleware/authJwt.js';
import validation from '../middleware/SchemaValidator.js';
import contCustomer from "../controllers/customer.controller.js";
const router = express.Router();

router.get("/", validation(), authenticateJWT, (req, res) => {
    return res.status(200).send({
        id: req.customer.id
    });
});
router.put("/", validation(), authenticateJWT, (req, res) => {
    contCustomer.updateCustomer(req, res).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
});

export default router;