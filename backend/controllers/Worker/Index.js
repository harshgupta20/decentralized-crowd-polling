const WorkerController = require("./WorkerController");

module.exports = class Worker {
    async GetWorkers(req, res) {
        try {
            const result = await new WorkerController().GetWorkers(req, res);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async signin(req, res) {
        try {
            const result = await new WorkerController().signin(req.body);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async nextTask(req, res) {
        try {
            const result = await new WorkerController().nextTask(req.query, req.userId);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async getBalance(req, res) {
        try {
            const result = await new WorkerController().getBalance(req.query, req.userId);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async payout(req, res) {
        try {
            const result = await new WorkerController().payout(req.body, req.userId);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async submission(req, res) {
        try {
            const result = await new WorkerController().submission(req.body, req.userId);
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }

    async editWorker(req, res) {
        try {
            res.status(500).send('GetWorkers');
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }
} 