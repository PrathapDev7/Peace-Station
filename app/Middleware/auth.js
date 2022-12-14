const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(400).json({
        message: "Access denied. Invalid token!",
        data: {}
    });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({
            message: "Access denied. Invalid token!",
            data: {}
        });
    }
};
