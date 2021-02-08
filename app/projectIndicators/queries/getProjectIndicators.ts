import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetProjectIndicatorsInput = Pick<
  Prisma.FindManyProjectIndicatorArgs,
  "where" | "orderBy" | "skip" | "take"
>

export default async function getProjectIndicators(
  { where, orderBy, skip = 0, take }: GetProjectIndicatorsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const projectIndicators = await db.projectIndicator.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.projectIndicator.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    projectIndicators,
    nextPage,
    hasMore,
    count,
  }
}
