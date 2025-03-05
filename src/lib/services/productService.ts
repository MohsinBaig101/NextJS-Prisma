import { prisma } from '@/lib/prisma';
import { ProductSchemaType } from '../schemas/products.schema';
export const ProductService = {
    saveProduct: async ({
        slug, title, coreAttribute, image, rentalPlans
    }: ProductSchemaType) => {
        const result = await prisma.products.create({
            data: {
                slug,
                title,
                coreAttribute,
                image,
                RentalPlans: {
                    create: rentalPlans.map((item: { price: any; period: any; }) => ({
                        price: item.price,
                        period: item.period
                    }))
                }
            },
            include: { RentalPlans: true }
        });
        return result;
    }
};