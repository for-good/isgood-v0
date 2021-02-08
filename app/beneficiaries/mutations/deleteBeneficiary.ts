import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteBeneficiaryInput = Pick<Prisma.BeneficiaryDeleteArgs, "where">

export default async function deleteBeneficiary({ where }: DeleteBeneficiaryInput, ctx: Ctx) {
  ctx.session.authorize()

  const beneficiary = await db.beneficiary.delete({ where })

  return beneficiary
}
