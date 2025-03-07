import { vi } from "vitest";

export const prisma = {
    products: {
        create: vi.fn(),
        findMany: vi.fn()
    }
}