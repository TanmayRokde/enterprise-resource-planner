-- CreateTable
CREATE TABLE "public"."studentFormData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "scholarshipId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "schoolStatus" INTEGER NOT NULL,
    "beoStatus" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentFormData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."studentFormData" ADD CONSTRAINT "studentFormData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."studentFormData" ADD CONSTRAINT "studentFormData_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "public"."Scholarships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
