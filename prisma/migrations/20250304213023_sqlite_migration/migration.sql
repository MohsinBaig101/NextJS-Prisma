-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "terminationReason" TEXT NOT NULL,
    "terminationComment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "activatedAt" DATETIME NOT NULL,
    "activeUntil" DATETIME NOT NULL,
    "terminatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscriptions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubscriptionsExtentions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "SubscriptionsExtentions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscriptions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SubscriptionsExtentions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "coreAttribute" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "RentalPlans" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "RentalPlans_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_userId_productId_key" ON "Subscriptions"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
