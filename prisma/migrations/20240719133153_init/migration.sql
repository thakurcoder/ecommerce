-- CreateTable
CREATE TABLE "Emailverification" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "otp" INTEGER NOT NULL,

    CONSTRAINT "Emailverification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emailverification_email_key" ON "Emailverification"("email");
