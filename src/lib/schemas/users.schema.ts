import z from 'zod';


export const createUserSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    gender: z.enum(['male', 'female', 'other', 'noDisclose']),
});

export type createUserType = z.infer<typeof createUserSchema>