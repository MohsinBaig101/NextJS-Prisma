import { prisma } from "../prisma";
import { createUserType } from "../schemas/users.schema";

export const createUser = async (body: createUserType): Promise<void> => {
    await prisma.users.create({
        data: {
            ...body
        }
    });
} 

export const getUsers = async () => {
    return await prisma.users.findMany();
}