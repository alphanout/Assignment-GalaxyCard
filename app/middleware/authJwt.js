import {
    secret
} from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import validator from "validator";
const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'undefined') {
        return res.status(400).send({
            error: "The apikey is required"
        });
    }
    let token = authHeader.split(' ');
    if (validator.isJWT(token[1]) && token[0] === 'Bearer') {
        token = token[1];
        jwt.verify(token, secret, (err, customer) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unautherized'
                });
            }
            req.customer = customer;
            next();
        });

    } else {
        res.status(400).send({
            error: "The apikey is invalid.."
        });
    }
};
export default jwtAuth;