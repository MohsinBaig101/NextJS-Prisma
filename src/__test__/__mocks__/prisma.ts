import { vi } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';
import { PrismaClient } from '@prisma/client';
export const prisma = mockDeep<PrismaClient>();
vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn(() => prisma),
}));