import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateDemographicInput = Pick<Prisma.DemographicCreateArgs, "data">
export default async function createDemographic({ data }: CreateDemographicInput, ctx: Ctx) {
  ctx.session.authorize()

  const demographic = await db.demographic.create({ data })

  return demographic
}
