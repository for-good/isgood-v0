import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetBeneficiariesInput
  extends Pick<Prisma.BeneficiaryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetBeneficiariesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: beneficiaries, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.beneficiary.count({ where }),
      query: (paginateArgs) => db.beneficiary.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      beneficiaries,
      nextPage,
      hasMore,
      count,
    }
  }
)
