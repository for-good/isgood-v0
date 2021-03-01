import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDemographicsInput
  extends Pick<Prisma.DemographicFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDemographicsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: demographics, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.demographic.count({ where }),
      query: (paginateArgs) => db.demographic.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      demographics,
      nextPage,
      hasMore,
      count,
    }
  }
)
