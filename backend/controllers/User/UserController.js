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