import { z } from "zod";


export const productCreationSchema = z.object({
    slug: z.string(),
    title: z.string(),
    coreAttribute: z.string(),
    image: z.string(),
    rentalPlans: z.array(z.object({
        period: z.string(),
        price: z.number()
    }))
});

export type ProductSchemaType = z.infer<typeof productCreationSchema>