import { validate } from "@/lib/validator";
import { NextApiRequest, NextApiResponse } from "next";

export const SubscribeProduct = validate((req: NextApiRequest, res: NextApiResponse) => {

});

export const cancelSubscribeProduct = (req: NextApiRequest, res: NextApiResponse) => {

}


const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<any>> = {
    POST: SubscribeProduct,
    PUT: cancelSubscribeProduct
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    return await handlers[method as string](req, res);
}