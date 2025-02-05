module.exports = class WorkerController {
    async GetWorkers(req, res) {
        try {
            return "worker data";
        } catch (error) {
            throw error;
        }
    }
}