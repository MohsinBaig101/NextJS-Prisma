import { prisma } from '@/lib/prisma';
import { ProductSchemaType } from '../schemas/products.schema';
import { productMapper, updateProductMapper, rentalPlansMapper } from '../mapper/product.mapper';

export const saveProduct = async (body: ProductSchemaType) => {
    const result = await prisma.products.create({
        data: productMapper(body),
        include: { RentalPlans: true }
    });
    return result;
}

export const getProduct = async (id: string) => {
    const product = await prisma.products.findFirst({
        where: {
            id
        },
        select: {
            slug: true,
            image: true,
            title: true,
            coreAttribute: true,
            RentalPlans: true
        }
    });
    return product;
}

export const updateProduct = async (id: string, body: ProductSchemaType): Promise<void> => {
    /**
     * First check productId is exist in our DB
     */
    await prisma.$transaction(async (tx) => {
        const productExist = await tx.products.findFirst({
            where: {
                id
            }
        });
        if (!productExist) throw new Error("Invalid product Id");

        /**
         * Update the product
         */
        const data = updateProductMapper(body);
        await tx.products.update({
            where: {
                id
            },
            data
        });
        await tx.rentalPlans.deleteMany({
            where: {
                productId: id
            }
        });
        await tx.rentalPlans.createMany({
            data: rentalPlansMapper({ rentalPlans: body.rentalPlans }, id)
        });
    });
}

export const deleteProduct = async (id: string): Promise<void> => {
    await prisma.$transaction(async (tx) => {
        await tx.rentalPlans.deleteMany({
            where: {
                productId: id
            }
        });
        /**
         * In relational database, we also used term Cascading delete, which auto delete the dependent table records.
         * but should apply on foreign-key level
         */
        await tx.products.delete({
            where: {
                id
            },
        });
    });
}

export const extendSubscription = async () => {

}