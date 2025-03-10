import { NextApiRequest, NextApiResponse } from 'next';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            req.body = schema.parse(req.body);
            return await handler(req, res);
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: 'Validation failed', errors: error.errors });
            }
            if (error instanceof Error) {
                return res.status(400).json({ message: error?.message });
            }
        }
    };
}