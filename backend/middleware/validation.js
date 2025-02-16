const zod = require("zod");


module.exports = {
    taskInput: (req, res, next) => {
        try {
            const schema = zod.object({
                options: zod.array(zod.string()),
                title: zod.string().min(3).max(100),
                signature: zod.string().min(3).max(100),
            });

            const result = schema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).send({ success: false, error: "Invalid Input" });
            }
            next();
        } catch (error) {
            return res.status(400).send({ success: false, error: error.message });
        }
    },
};