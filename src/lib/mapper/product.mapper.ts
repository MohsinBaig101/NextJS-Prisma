import { ProductSchemaType } from "../schemas/products.schema";

/**
 * 
 * Mapper will be used for Product creation
 * @param body 
 * @returns 
 */
export const productMapper = (body: ProductSchemaType) => {
    return {
        slug: body.slug,
        title: body.title,
        coreAttribute: body.coreAttribute,
        image: body.image,
        RentalPlans: {
            create: rentalPlansMapper(body)
        }
    }
}

export const updateProductMapper = (body: Omit<ProductSchemaType, 'rentalPlans'>) => {
    return {
        slug: body.slug,
        title: body.title,
        coreAttribute: body.coreAttribute,
        image: body.image
    }
}
type RentalPlan = { price: number; period: string };

// Overloads for different return types
export function rentalPlansMapper(body: Pick<ProductSchemaType, "rentalPlans">, productId: string): (RentalPlan & { productId: string })[];
export function rentalPlansMapper(body: Pick<ProductSchemaType, "rentalPlans">, productId?: undefined): RentalPlan[];
export function rentalPlansMapper(body: Pick<ProductSchemaType, "rentalPlans">, productId?: string) {
  return body.rentalPlans.map(plan => ({
    ...(productId ? { productId } : {}),
    price: plan.price,
    period: plan.period,
  }));
}