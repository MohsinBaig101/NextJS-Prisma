import { describe, expect, test, vi } from 'vitest'
import { createMocks, RequestMethod, createRequest, createResponse } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/__test__/__mocks__/prisma';

import handler from '@/pages/api/products';

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

describe('Products API test suit', () => {
    test('should return 400, If request body is incorrect', async () => {
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

    test('create product with valid data', async () => {
        const { req, res } = mockRequestResponse('POST');
        req.body = {
            "slug": "test-2-slug",
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
        prisma.products.create.mockResolvedValue({
            "id": "1",
            "slug": "test-2-slug",
            "title": "slug-title",
            "coreAttribute": "Iphone 14 pro max",
            "image": "image1"
        });
        await handler(req, res);
        const errorMessage = res._getJSONData();
        expect(errorMessage.message).toBe('Record saved successfully')
        expect(res.statusCode).toBe(201);
    });

    test('get All Products', async () => {
        const resObj = [{ id: "string", slug: "string", title: "string", coreAttribute: "string", image: "string" }];
        const { req, res } = mockRequestResponse('GET');
        prisma.products.findMany.mockResolvedValue(resObj);
        await handler(req, res);
        expect(res._getJSONData()).toEqual(resObj);
    })
});