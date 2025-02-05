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

    async editWorker(req, res) {
        try {
            res.status(500).send('GetWorkers');
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error: error.message || "Something went wrong!" });
        }
    }
} 