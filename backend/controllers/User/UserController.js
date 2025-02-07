const { PrismaClient } = require("@prisma/client");
const { signJwt } = require("../../utils/jwt");
require('dotenv').config();


const prismaClient = new PrismaClient();
const USER_JWT_SECRET = process.env.JWT_SECRET;

module.exports = class UserController {
    async getUsers(requestBody) {
        try {
            return "data";
        } catch (error) {
            throw error;
        }
    }

    async addTask(requestBody, userId) {
        try {
            const { options, title, signature } = requestBody;

            const addTaskQueryResponse = await prismaClient.$transaction(async (prisma) => {
                const task = await prisma.task.create({
                    data: {
                        title,
                        amount: "100",
                        signature,
                        user_id: userId,
                    }
                });

                const optionTableResponse = await prisma.option.createMany({
                    data: options.map((item) => ({
                        image_url: item.imageUrl,
                        task_id: task.id,
                    }))
                });


                return { task, optionTableResponse };
            });

            return addTaskQueryResponse;
        } catch (error) {
            throw error;
        }
    }

    async getTask(queryBody, userId) {
        try {
            const { taskId } = queryBody;
            const task = await prismaClient.task.findMany({
                where: {
                    id: taskId && Number(taskId),
                    user_id: userId
                },
                include: {
                    options: true
                }
            });

            const optionTableResponse = await prismaClient.submission.findMany({
                where: {
                    task_id: taskId && Number(taskId)
                },
                include: {
                    option: true
                }
            });

            task.map((item) => {
                item.optionWithMaxCount = {};
                item.options.map((option) => {
                    let count = 0;
                    optionTableResponse.forEach((submission) => {
                        if (submission.option_id === option.id) {
                            count++;
                        }
                    })
                    option.count = count;
                    if ((item.optionWithMaxCount?.count ?? 0) < count) {
                        item.optionWithMaxCount = { id: option.id, imageUrl: option.image_url, count };
                    }
                })
            });

            return task;
        } catch (error) {
            throw error;
        }
    }

    async signin(requestBody) {
        try {
            const solanaAddress = "96hghnkZF55d3v4iDK2VkpURbVLvpY78XrT8y3t7Wbcq";

            let userData = await prismaClient.user.findFirst({
                where: {
                    address: solanaAddress
                }
            });

            if (!userData) {
                userData = await prismaClient.user.create({
                    data: {
                        address: solanaAddress
                    }
                });
            }

            const token = signJwt({ id: userData.id, role: "user" }, USER_JWT_SECRET);

            return token;
        } catch (error) {
            throw error;
        }
    }
}