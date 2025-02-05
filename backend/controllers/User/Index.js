const UserController = require("./UserController");

module.exports = class User {
    async GetUsers(req, res) {
        try {
            const result = await new UserController().getUsers(req.body);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }
    
    async signin(req, res) {
        try {
            const result = await new UserController().signin(req.body);
            res.status(200).send({
                success: true,
                token: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }
} 