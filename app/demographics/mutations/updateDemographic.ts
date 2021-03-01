import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateDemographic = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateDemographic),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const demographic = await db.demographic.update({ where: { id }, data })

    return demographic
  }
)
