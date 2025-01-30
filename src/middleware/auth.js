
const jwt = require("jsonwebtoken");

//auth-guard
function authGuard(req, res, next) {
    const token = req.header("x-auth-token");
    if (token && token !== "") {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).send({ status: false, message: "Token has expired. Please log in again." });
            } else {
                return res.status(401).send({ status: false, message: "Invalid token. Please log in again." });
            }
        }
    } else {
        return res.status(401).send({ status: false, message: 'Access denied. No token provided.' });
    }
}

exports.authGuard = authGuard;