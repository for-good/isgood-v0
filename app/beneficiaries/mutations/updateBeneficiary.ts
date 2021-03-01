import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateBeneficiaryInput = Pick<Prisma.BeneficiaryUpdateArgs, "where" | "data">

export default async function updateBeneficiary({ where, data }: UpdateBeneficiaryInput, ctx: Ctx) {
  ctx.session.$authorize()

  const beneficiary = await db.beneficiary.update({ where, data })

  return beneficiary
}

// import { resolver } from "blitz"
// import db from "db"
// import * as z from "zod"

// const UpdateBeneficiary = z
//   .object({
//     id: z.number(),
//     name: z.string(),
//   })
//   .nonstrict()

// export default resolver.pipe(
//   resolver.zod(UpdateBeneficiary),
//   resolver.authorize(),
//   async ({ id, ...data }) => {
//     // TODO: in multi-tenant app, you must add validation to ensure correct tenant
//     const beneficiary = await db.beneficiary.update({ where: { id }, data })

//     return beneficiary
//   }
// )
