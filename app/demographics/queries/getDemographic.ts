import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetDemographic = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetDemographic), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const demographic = await db.demographic.findFirst({ where: { id } })

  if (!demographic) throw new NotFoundError()

  return demographic
})
