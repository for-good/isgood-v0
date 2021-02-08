import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateBeneficiaryInput = Pick<Prisma.BeneficiaryUpdateArgs, "where" | "data">

export default async function updateBeneficiary({ where, data }: UpdateBeneficiaryInput, ctx: Ctx) {
  ctx.session.authorize()

  const beneficiary = await db.beneficiary.update({ where, data })

  return beneficiary
}
