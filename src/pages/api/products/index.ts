import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';
import { validate } from "@/lib/validator";
import { productCreationSchema } from '@/lib/schemas/products.schema';
import * as productService from '@/lib/services/productService';
import { ProductSchemaType } from '@/lib/schemas/products.schema';

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  const result = await prisma.products.findMany(
    {
      include: {
        RentalPlans: true
      }
    }
  );
  return res.status(200).send(result);
}
const saveProduct = validate(productCreationSchema, async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await productService.saveProduct(req.body as ProductSchemaType);
  return res.status(201).send({
    message: 'Record saved successfully',
    result
  })
});

const methods: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<any>> = {
  GET: getProducts,
  POST: saveProduct
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const reqMethod = req.method as string;
  if (reqMethod) {
    return await methods[reqMethod](req, res);
  }
}
