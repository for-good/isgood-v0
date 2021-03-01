import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateBeneficiaryInput = Pick<Prisma.BeneficiaryCreateArgs, "data">
export default async function createBeneficiary({ data }: CreateBeneficiaryInput, ctx: Ctx) {
  ctx.session.$authorize()

  const beneficiary = await db.beneficiary.create({ data })

  return beneficiary
}
