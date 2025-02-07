const { verifyJwt } = require("../utils/jwt");
require('dotenv').config();

const USER_JWT_SECRET = process.env.JWT_SECRET;
const WORKER_JWT_SECRET = process.env.JWT_SECRET + "worker";

module.exports = {
    userAuthMiddleware: (req, res, next) => {
        try {
            const token = req.headers["authorization"] ?? "";
            if (!token) {
                return res.status(401).send("Not logged In!");
            }

            const decodedToken = verifyJwt(token, USER_JWT_SECRET);
            if (!decodedToken.id) {
                return res.status(401).send("Not logged In!");
            }
            req.userId = decodedToken.id;
            next();
        }
        catch (error) {
            return res.status(401).send({ success: false, error: error.message || "Not logged In!" });
        }
    },

    workerAuthMiddleware: (req, res, next) => {
        try {
            const token = req.headers["authorization"] ?? "";
            if (!token) {
                return res.status(401).send("Not logged In!");
            }

            const decodedToken = verifyJwt(token, WORKER_JWT_SECRET);
            if (!decodedToken.id) {
                return res.status(401).send("Not logged In!");
            }
            req.userId = decodedToken.id;
            next();
        }
        catch (error) {
            return res.status(401).send({ success: false, error: error.message || "Not logged In!" });
        }
    }

}