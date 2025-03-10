import { NextApiRequest, NextApiResponse } from "next";
import * as productService from '@/lib/services/productService';
import { productCreationSchema } from '@/lib/schemas/products.schema';
import { validate } from "@/lib/validator";

export const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const product = await productService.getProduct(id as string);
    res.status(200).send({
        product
    });
}

export const updateProduct = validate(productCreationSchema, async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const body = req.body;
    await productService.updateProduct(id as string, body);
    res.status(200).send({
        message: 'Product has been updated successfully'
    });
});

export const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    await productService.deleteProduct(id as string);
    res.status(200).send({
        message: 'Record has been deleted successfully'
    })
}

const handlers: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<void>> = {
    GET: getProduct,
    PUT: updateProduct,
    DELETE: deleteProduct
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method;
    if (method) {
        return await handlers[method](req, res);
    }
}
export default handler;