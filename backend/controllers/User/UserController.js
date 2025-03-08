const { PrismaClient } = require("@prisma/client");
const { signJwt } = require("../../utils/jwt");
const { getRandomSixDigitNumber } = require("../../utils/helperFunction");
const cloudinaryUpload = require("../../utils/cloudinaryUpload");
require('dotenv').config();
const { PublicKey } = require("@solana/web3.js");
const nacl = require("tweetnacl");


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

            if (options.length == 0 || !options || options?.length > 5) {
                throw "Task options are invalid."
            }

            const { optionsImageSuccess, optionImageFailBase64 } = await uploadAndCollectCloudinaryUrl(options, userId);


            const addTaskQueryResponse = await prismaClient.$transaction(async (prisma) => {
                const task = await prisma.task.create({
                    data: {
                        title,
                        amount: 100,
                        signature,
                        user_id: userId,
                    }
                });

                const optionTableResponse = await prisma.option.createMany({
                    data: optionsImageSuccess.map((imageUrl) => ({
                        image_url: imageUrl,
                        task_id: task.id,
                    }))
                });


                return { task, optionTableResponse };
            });

            return { addTaskQueryResponse, optionImageFailBase64 };
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
            const { publicKey, signature } = requestBody;
            if (!publicKey || !signature) {
                throw new Error("Required fields are missing.");
            }

            // CHECK SIGNAIURE FROM CLIENT_SIDE
            const message = new TextEncoder().encode("Sign in with Decentralized Crowd Polling.");
            const result = nacl.sign.detached.verify(
                message,
                new Uint8Array(signature.data),
                new PublicKey(publicKey).toBytes(),
            );
            console.log("result:", result);

            if(!result){
                throw new Error("Couldn't verify your wallet.");
            }


            let userData = await prismaClient.user.findFirst({
                where: {
                    address: publicKey
                }
            });

            if (!userData) {
                userData = await prismaClient.user.create({
                    data: {
                        address: publicKey
                    }
                });
            }

            const token = signJwt({ id: userData.id, role: "user", address: publicKey }, USER_JWT_SECRET);

            return { address: publicKey, token };
        } catch (error) {
            throw error;
        }
    }
}


const uploadAndCollectCloudinaryUrl = async (options, userId) => {
    try {
        let optionsImageSuccess = [];
        let optionImageFailBase64 = [];

        for (let i = 0; i <= options.length; i++) {
            const uploadResult = await cloudinaryUpload(options[i], `${userId}-${i}-${getRandomSixDigitNumber()}`);

            if (uploadResult.success) {
                optionsImageSuccess.push(uploadResult?.data?.url);
            }
            else {
                optionImageFailBase64.push(options[i]);
            }
        }

        return { optionsImageSuccess, optionImageFailBase64 }
    }
    catch (error) {
        throw error;
    }
}