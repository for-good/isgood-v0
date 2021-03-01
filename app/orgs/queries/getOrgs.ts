import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetOrgsInput
  extends Pick<Prisma.OrgFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrgsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: orgs, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.org.count({ where }),
      query: (paginateArgs) => db.org.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      orgs,
      nextPage,
      hasMore,
      count,
    }
  }
)
