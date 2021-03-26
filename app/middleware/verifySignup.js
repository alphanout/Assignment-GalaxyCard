import validator from "validator";

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export default (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const phone_no = req.body.phone_no;
    // console.log(`name:${email}  ${validateEmail(email)}`);
    if (validator.isAlpha(firstName) && validator.isAlpha(lastName) && validateEmail(email) && validator.isAlpha(password)) {
        if (validator.isByteLength(password, {
                min: 8,
                max: 32
            })) {
            if (!validator.isMobilePhone(phone_no))
                return res.status(400).send({
                    error: true,
                    message: 'invalid phone no.'
                });

            next();
        } else {
            res.status(406).send({
                error: "password length should be in 8 to 32"
            });
        }
    } else {
        if (validateEmail(email)) res.status(400).send({
            error: "provide valid email"
        });
        res.status(400).send({
            error: "All parameters are required"
        });
    }
};