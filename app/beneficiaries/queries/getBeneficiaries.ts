import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetBeneficiariesInput = Pick<
  Prisma.FindManyBeneficiaryArgs,
  "where" | "orderBy" | "skip" | "take"
>


export default async function getBeneficiaries(
  { where, orderBy, skip = 0, take }: GetBeneficiariesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const beneficiaries = await db.beneficiary.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  
  const count = await db.beneficiary.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    beneficiaries,
    nextPage,
    hasMore,
    count,
  }
}
