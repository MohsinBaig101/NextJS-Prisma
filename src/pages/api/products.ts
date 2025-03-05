import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '@/lib/prisma';
import { validate } from "@/lib/validator";
import { productCreationSchema } from '@/lib/schemas/products.schema';
import { ProductService } from '@/lib/services/productService';

const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await prisma.products.findMany(
      {
        include: {
          RentalPlans: true
        }
      }
    );
    return res.status(200).json(result);
  },
  POST: validate(productCreationSchema, async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await ProductService.saveProduct(req.body);
    return res.status(201).json({
      message: 'Record saved successfully',
      result
    })
  }),
  PUT: async (req: NextApiRequest, res: NextApiResponse) => {
    
  },
  DELETE: async (req: NextApiRequest, res: NextApiResponse) => {

  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const reqMethod = req.method;
  if (!reqMethod) return res.status(405).json({ message: 'Method Not Allowed' });
  return await handlers[req.method as keyof typeof handlers](req, res);
}
