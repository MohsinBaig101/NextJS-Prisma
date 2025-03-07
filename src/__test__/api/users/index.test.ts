import { describe, expect, test } from "vitest";
import { createMocks, createRequest, createResponse, RequestMethod } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/users";

function mockReqAndRes(method: RequestMethod = 'GET') {
    const { req, res }: { req: NextApiRequest & ReturnType<typeof createRequest>, res: NextApiResponse & ReturnType<typeof createResponse> } = createMocks({ method });
    return { req, res };
}

describe('User Handler', () => {
    test('Should return the 200 with valid input', async () => {
        const userCreateMock = {
            firstName: 'Mohsin',
            lastName: 'Nawaz Baig',
            age: 28,
            gender: 'male'
        }
        const { req, res } = mockReqAndRes('POST');
        req.body = userCreateMock;
        await handler(req, res);
        const response = res._getJSONData();
        expect(response.message).toBe('Record Saved Successfully');
        expect(res.statusCode).toBe(201);
    });

    test('Should return the 400 with in-valid input', async () => {
        const userCreateMock = {
            age: 28,
            gender: 'male'
        }
        const { req, res } = mockReqAndRes('POST');
        req.body = userCreateMock;
        await handler(req, res);
        expect(res.statusCode).toBe(400);
    });

    test('Should return 200',async () => {
        const {req,res} = mockReqAndRes('GET');
        await handler(req,res);
        expect(res.statusCode).toBe(200)
    });
});