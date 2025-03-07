import { NextApiRequest, NextApiResponse } from "next";
import { createUserSchema } from "@/lib/schemas/users.schema";
import { validate } from "@/lib/validator";
import * as userService from "@/lib/services/userService";

/**
 * Response always return the Event
 */
export const saveUser = validate(createUserSchema, async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    await userService.createUser(body);
    return res.status(201).json({
        message: 'Record Saved Successfully'
    });
});

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await userService.getUsers();
    return res.status(200).json(users);
}

const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<any>> = {
    POST: saveUser,
    GET: getUsers
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as string;
    return await handlers[method](req, res);
}
export default handler;