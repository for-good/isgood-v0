import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateDemographic = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateDemographic),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const demographic = await db.demographic.create({ data: input })

    return demographic
  }
)
