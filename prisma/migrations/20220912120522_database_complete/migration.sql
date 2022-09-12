-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cvc" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isVirtual" BOOLEAN NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wifi" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Wifi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Note_userId_title_key" ON "Note"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Card_userId_title_key" ON "Card"("userId", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Wifi_userId_title_key" ON "Wifi"("userId", "title");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wifi" ADD CONSTRAINT "Wifi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
