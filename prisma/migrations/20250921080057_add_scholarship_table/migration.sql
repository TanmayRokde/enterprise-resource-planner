-- CreateTable
CREATE TABLE "public"."Scholarships" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "formFormat" TEXT NOT NULL,
    "lastDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Scholarships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scholarships_name_key" ON "public"."Scholarships"("name");
