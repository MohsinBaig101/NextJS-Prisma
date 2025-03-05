import { describe, expect, test } from 'vitest'
import { createMocks, RequestMethod, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/products';

describe('Products API test suit', () => {

    function mockRequestResponse(method: RequestMethod = 'GET') {
        const {
            req,
            res,
        }: { 
            req: NextApiRequest & ReturnType<typeof createRequest>;
            res: NextApiResponse & ReturnType<typeof createResponse>; 
        } = createMocks({ method });
        req.headers = {
            'Content-Type': 'application/json',
            'X-SESSION-TOKEN': 'authToken',
        };
        return { req, res };
    }

    test('create product with invalid data', async () => {
        const { req, res } = mockRequestResponse('POST');
        req.body = {
            // "slug":"test-2-slug",
            "title": "slug-title",
            "coreAttribute": "Iphone 14 pro max",
            "image": "image1",
            "rentalPlans": [
                {
                    "period": "1",
                    "price": 1500
                },
                {
                    "period": "2",
                    "price": 3000
                }
            ]
        };
        await handler(req, res);
        const errorMessage = res._getJSONData();
        expect(errorMessage.message).toBe('Validation failed')
        expect(res.statusCode).toBe(400);
    })
});