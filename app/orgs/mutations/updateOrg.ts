import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateOrgInput = Pick<Prisma.OrgUpdateArgs, "where" | "data">

export default async function UpdateOrg({ where, data }: UpdateOrgInput, ctx: Ctx) {
  ctx.session.$authorize()

  const org = await db.org.update({ where, data })

  return org
}

// import { resolver } from "blitz"
// import db from "db"
// import * as z from "zod"

// const UpdateOrg = z
//   .object({
//     id: z.number(),
//     name: z.string(),
//   })
//   .nonstrict()

// export default resolver.pipe(
//   resolver.zod(UpdateOrg),
//   resolver.authorize(),
//   async ({ id, ...data }) => {
//     // TODO: in multi-tenant app, you must add validation to ensure correct tenant
//     const org = await db.org.update({ where: { id }, data })

//     return org
//   }
// )
