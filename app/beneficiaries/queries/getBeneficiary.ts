import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetBeneficiary = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetBeneficiary), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const beneficiary = await db.beneficiary.findFirst({ where: { id } })

  if (!beneficiary) throw new NotFoundError()

  return beneficiary
})
