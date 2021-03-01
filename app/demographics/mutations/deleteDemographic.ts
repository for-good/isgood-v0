import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteDemographic = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteDemographic),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const demographic = await db.demographic.deleteMany({ where: { id } })

    return demographic
  }
)
