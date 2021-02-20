-- AlterTable
ALTER TABLE "org" ALTER COLUMN "plan" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT E'active';

-- AlterTable
ALTER TABLE "orgUser" ALTER COLUMN "status" SET DEFAULT E'active',
ALTER COLUMN "statusDeactivatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "geolocation" DROP NOT NULL;
