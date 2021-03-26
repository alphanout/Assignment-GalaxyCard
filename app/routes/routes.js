import express from 'express';
const router = express.Router();

router.get("/", validation(), function (_req, res) {
    res.status(200).json({
        message: "hooray! welcome to our api!"
    });
});

export default router;