/*
  Warnings:

  - The migration will remove the values [USER,ADMIN,MANAGER] on the enum `Role`. If these variants are still used in the database, the migration will fail.
  - You are about to drop the `Beneficiary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Demographic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectIndicator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BeneficiaryToDemographic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BeneficiaryToProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToProjectIndicator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "_BeneficiaryToDemographic" DROP CONSTRAINT "_BeneficiaryToDemographic_A_fkey";

-- DropForeignKey
ALTER TABLE "_BeneficiaryToDemographic" DROP CONSTRAINT "_BeneficiaryToDemographic_B_fkey";

-- DropForeignKey
ALTER TABLE "_BeneficiaryToProject" DROP CONSTRAINT "_BeneficiaryToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_BeneficiaryToProject" DROP CONSTRAINT "_BeneficiaryToProject_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToProjectIndicator" DROP CONSTRAINT "_ProjectToProjectIndicator_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToProjectIndicator" DROP CONSTRAINT "_ProjectToProjectIndicator_B_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Demographic";

-- DropTable
DROP TABLE "Beneficiary";


-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectIndicator";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_BeneficiaryToDemographic";

-- DropTable
DROP TABLE "_BeneficiaryToProject";

-- DropTable
DROP TABLE "_ProjectToProjectIndicator";

-- CreateEnum
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'ORGANIZATION_OWNER', 'PROJECT_OWNER', 'PROJECT_MANAGER', 'COLLABORATOR', 'GUEST_VIEW');

-- DropEnum
DROP TYPE "Role";


-- AlterEnum
ALTER TYPE "Role_new" RENAME TO "Role";



-- CreateTable
CREATE TABLE "beneficiary" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "lifeChange" TEXT,
    "importHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beneficiaryDemographicDemographic" (
"id" SERIAL,
    "beneficiaryId" INTEGER NOT NULL,
    "demographicId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demographic" (
"id" SERIAL,
    "name" TEXT,
    "fieldType" TEXT,
    "value" TEXT,
    "operator" TEXT,
    "importHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "org" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "planStatus" TEXT NOT NULL DEFAULT E'active',
    "planStripeCustomerId" TEXT,
    "planUserId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgUser" (
"id" SERIAL,
    "orgId" INTEGER,
    "userId" INTEGER NOT NULL,
    "roles" "Role" NOT NULL DEFAULT E'ORGANIZATION_OWNER',
    "invitationToken" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statusDeactivatedAt" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgUserProjectProject" (
"id" SERIAL,
    "orgUser" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "orgUserRole" "Role" NOT NULL DEFAULT E'PROJECT_OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "impacts" TEXT NOT NULL,
    "outcomes" TEXT NOT NULL,
    "geolocation" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "importHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "orgId" INTEGER,
    "createdById" INTEGER,
    "updatedById" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectBeneficiaryBeneficiary" (
"id" SERIAL,
    "projectId" INTEGER NOT NULL,
    "beneficiaryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectIndicatorProjectProject" (
"id" SERIAL,
    "projectId" INTEGER NOT NULL,
    "projectIndicatorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projectIndicators" (
"id" SERIAL,
    "indicatorId" TEXT,
    "importHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
"id" SERIAL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "emailVerified" BOOLEAN DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationExpiresAt" TIMESTAMP(3),
    "passwordResetToken" TEXT,
    "passwordResetTokenExpiresAt" TIMESTAMP(3),
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "jwtTokenInvalidBefore" TIMESTAMP(3),
    "importHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);


-- BEGIN;
-- CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'ORGANIZATION_OWNER', 'PROJECT_OWNER', 'PROJECT_MANAGER', 'COLLABORATOR', 'GUEST_VIEW');
-- ALTER TABLE "orgUser" ALTER COLUMN "roles" TYPE "Role_new" USING ("roles"::text::"Role_new");
-- ALTER TABLE "orgUserProjectProject" ALTER COLUMN "orgUserRole" TYPE "Role_new" USING ("orgUserRole"::text::"Role_new");
-- ALTER TYPE "Role" RENAME TO "Role_old";
-- ALTER TYPE "Role_new" RENAME TO "Role";
-- DROP TYPE "Role_old";
-- COMMIT;




-- CreateIndex
CREATE UNIQUE INDEX "org.url_unique" ON "org"("url");

-- CreateIndex
CREATE UNIQUE INDEX "user.emailVerificationToken_unique" ON "user"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.importHash_unique" ON "user"("importHash");

-- AddForeignKey
ALTER TABLE "beneficiaryDemographicDemographic" ADD FOREIGN KEY("beneficiaryId")REFERENCES "beneficiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beneficiaryDemographicDemographic" ADD FOREIGN KEY("demographicId")REFERENCES "demographic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "org" ADD FOREIGN KEY("createdById")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "org" ADD FOREIGN KEY("updatedById")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgUser" ADD FOREIGN KEY("orgId")REFERENCES "org"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgUser" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgUserProjectProject" ADD FOREIGN KEY("orgUser")REFERENCES "orgUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgUserProjectProject" ADD FOREIGN KEY("projectId")REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD FOREIGN KEY("createdById")REFERENCES "orgUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD FOREIGN KEY("orgId")REFERENCES "org"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD FOREIGN KEY("updatedById")REFERENCES "orgUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectBeneficiaryBeneficiary" ADD FOREIGN KEY("beneficiaryId")REFERENCES "beneficiary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectBeneficiaryBeneficiary" ADD FOREIGN KEY("projectId")REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectIndicatorProjectProject" ADD FOREIGN KEY("projectId")REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projectIndicatorProjectProject" ADD FOREIGN KEY("projectIndicatorId")REFERENCES "projectIndicators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD FOREIGN KEY("userId")REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
