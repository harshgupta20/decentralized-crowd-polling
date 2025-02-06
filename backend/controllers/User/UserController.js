const { PrismaClient } = require("@prisma/client");
const { signJwt } = require("../../utils/jwt");


const prismaClient = new PrismaClient();

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


                return {task, optionTableResponse};
            });

            return addTaskQueryResponse;
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

            if(!userData){
                userData = await prismaClient.user.create({
                    data: {
                        address: solanaAddress
                    }
                });
            }
            const token = signJwt({ id: userData.id });
            return token;
        } catch (error) {
            throw error;
        }
    }
}