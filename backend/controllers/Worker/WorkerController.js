const { PrismaClient } = require("@prisma/client");
const { signJwt } = require("../../utils/jwt");
require('dotenv').config();

const WORKER_JWT_SECRET = process.env.JWT_SECRET + "worker";
const prismaClient = new PrismaClient();

module.exports = class WorkerController {
    async GetWorkers(req, res) {
        try {
            return "worker data";
        } catch (error) {
            throw error;
        }
    }

    async signin(requestBody) {
        try {
            const solanaAddress = "96hghnkZF55d3v4iDK2VkpURbVLvpY78XrT8y3t7Wbcq";

            let userData = await prismaClient.worker.findFirst({
                where: {
                    address: solanaAddress
                }
            });

            if (!userData) {
                userData = await prismaClient.worker.create({
                    data: {
                        address: solanaAddress,
                        pending_amount: 0,
                        locked_amount: 0
                    }
                });
            }
            const token = signJwt({ id: userData.id, role: "worker" }, WORKER_JWT_SECRET);
            return token;
        } catch (error) {
            throw error;
        }
    }
}