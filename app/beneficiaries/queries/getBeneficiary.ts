import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetBeneficiaryInput = Pick<Prisma.FindFirstBeneficiaryArgs, "where">

export default async function getBeneficiary({ where }: GetBeneficiaryInput, ctx: Ctx) {
  ctx.session.authorize()

  const beneficiary = await db.beneficiary.findFirst({ where })

  if (!beneficiary) throw new NotFoundError()

  return beneficiary
}
