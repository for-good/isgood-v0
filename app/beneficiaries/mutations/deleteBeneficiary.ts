import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteBeneficiary = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteBeneficiary),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const beneficiary = await db.beneficiary.deleteMany({ where: { id } })

    return beneficiary
  }
)
