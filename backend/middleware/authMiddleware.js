const { verifyJwt } = require("../utils/jwt");

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"] ?? "";
        if (!token) {
            return res.status(401).send("Not logged In!");
        }

        const decodedToken = verifyJwt(token);
        if (!decodedToken.id) {
            return res.status(401).send("Not logged In!");
        }
        req.userId = decodedToken.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ success: false, error: error.message || "Not logged In!" });
    }
}