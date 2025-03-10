import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';
import { validate } from "@/lib/validator";
import { productCreationSchema } from '@/lib/schemas/products.schema';
import * as productService from '@/lib/services/productService';
import { ProductSchemaType } from '@/lib/schemas/products.schema';

async function getProducts(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const result = await prisma.products.findMany(
    {
      include: {
        RentalPlans: true
      }
    }
  );
  res.status(200).json(result);
}
const saveProduct = validate(productCreationSchema, async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const result = await productService.saveProduct(req.body as ProductSchemaType);
  res.status(201).json({
    message: 'Record saved successfully',
    result
  })
});

const methods: Record<string, (req: NextApiRequest, res: NextApiResponse) => Promise<void>> = {
  GET: getProducts,
  POST: saveProduct
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const reqMethod = req.method as string;
  return await methods[reqMethod](req, res);
}
