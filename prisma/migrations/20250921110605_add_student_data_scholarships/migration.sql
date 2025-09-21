/*
  Warnings:

  - A unique constraint covering the columns `[userId,scholarshipId]` on the table `studentFormData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "studentFormData_userId_scholarshipId_key" ON "public"."studentFormData"("userId", "scholarshipId");
