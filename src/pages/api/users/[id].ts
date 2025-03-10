import { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/lib/services/userService";

export const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const user = await userService.getUser(id as string);
    return res.status(200).json(user);
}

const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<any>> = {
    GET: getUser
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method as string;
    return await handlers[method](req, res);
}
export default handler;