import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetDemographicInput = Pick<Prisma.FindFirstDemographicArgs, "where">

export default async function getDemographic({ where }: GetDemographicInput, ctx: Ctx) {
  ctx.session.authorize()

  const demographic = await db.demographic.findFirst({ where })

  if (!demographic) throw new NotFoundError()

  return demographic
}
