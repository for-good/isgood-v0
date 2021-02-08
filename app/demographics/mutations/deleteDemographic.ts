import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteDemographicInput = Pick<Prisma.DemographicDeleteArgs, "where">

export default async function deleteDemographic({ where }: DeleteDemographicInput, ctx: Ctx) {
  ctx.session.authorize()

  const demographic = await db.demographic.delete({ where })

  return demographic
}
