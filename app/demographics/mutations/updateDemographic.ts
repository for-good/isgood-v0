import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateDemographicInput = Pick<Prisma.DemographicUpdateArgs, "where" | "data">

export default async function updateDemographic({ where, data }: UpdateDemographicInput, ctx: Ctx) {
  ctx.session.authorize()

  const demographic = await db.demographic.update({ where, data })

  return demographic
}
