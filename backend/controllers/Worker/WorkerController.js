const { PrismaClient } = require("@prisma/client");
const { signJwt } = require("../../utils/jwt");
require('dotenv').config();

const WORKER_JWT_SECRET = process.env.JWT_SECRET + "worker";
const prismaClient = new PrismaClient();

const TOTAL_SUBMISSIONS = 100;
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

    async submission(requestBody, userId) {
        try {
            const solanaAddress = "96hghnkZF55d3v4iDK2VkpURbVLvpY78XrT8y3t7Wbcq";
            const { taskId, optionId } = requestBody;

            const userCurrentTask = await nextTaskByUserId(userId);

            if(!taskId || (taskId !== userCurrentTask.id)) {
                return "Task not found";
            }

            const amount = (Number(userCurrentTask.amount) / TOTAL_SUBMISSIONS).toString();

            const optionInfo = await prismaClient.option.findFirst({
                where: {
                    task_id: taskId,
                    id: optionId
                }
            });

            if(!optionInfo){
                return "Option not found";
            }

            const submissionTransaction = await prismaClient.$transaction(async (prisma) => {
                const submission = await prisma.submission.create({
                    data: {
                        task_id: taskId,
                        worker_id: userId,
                        option_id: optionId,
                        amount: amount
                    }
                });

                const task = await prisma.worker.update({
                    where: {
                        id: userId
                    },
                    data: {
                        pending_amount: {
                            increment: Number(amount)
                        }
                    }
                });

                return { submission, task };
            });

            const userNextTask = await nextTaskByUserId(userId);

            return {submissionTransaction, nextTask: userNextTask};
        } catch (error) {
            throw error;
        }
    }

    async nextTask(queryData, userId) {
        try {
            const response = await nextTaskByUserId(userId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getBalance(queryData, userId) {
        try {
            const response = await prismaClient.worker.findFirst({
                where: {
                    id: userId
                },
                select: {
                    pending_amount: true,
                    locked_amount: true
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const nextTaskByUserId = async (userId) => {
    try {
        const response = await prismaClient.task.findFirst({
            where: {
                done: false,
                submissions: {
                    none: {
                        worker_id: userId
                    }
                }
            },
            select: {
                id: true,
                title: true,
                options: true,
                amount: true
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}
