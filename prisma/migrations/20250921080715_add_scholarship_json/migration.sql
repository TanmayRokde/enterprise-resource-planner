/*
  Warnings:

  - Changed the type of `formFormat` on the `Scholarships` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Scholarships" DROP COLUMN "formFormat",
ADD COLUMN     "formFormat" JSONB NOT NULL;
