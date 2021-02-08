import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetDemographicsInput = Pick<
  Prisma.FindManyDemographicArgs,
  "where" | "orderBy" | "skip" | "take"
>

export default async function getDemographics(
  { where, orderBy, skip = 0, take }: GetDemographicsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const demographics = await db.demographic.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.demographic.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    demographics,
    nextPage,
    hasMore,
    count,
  }
}
