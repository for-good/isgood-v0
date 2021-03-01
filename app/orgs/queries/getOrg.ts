import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetOrgInput = Pick<Prisma.OrgFindFirstArgs, "where">

export default async function getProject({ where }: GetOrgInput, ctx: Ctx) {
  ctx.session.$authorize()

  const org = await db.org.findFirst({ where, include: { projects: true } })

  if (!org) throw new NotFoundError()

  return org
}

// import { resolver, NotFoundError } from "blitz"
// import db from "db"
// import * as z from "zod"

// const GetOrg = z.object({
//   // This accepts type of undefined, but is required at runtime
//   id: z.number().optional().refine(Boolean, "Required"),
// })

// export default resolver.pipe(resolver.zod(GetOrg), resolver.authorize(), async ({ id }) => {
//   // TODO: in multi-tenant app, you must add validation to ensure correct tenant
//   const org = await db.org.findFirst({ where: { id } })

//   if (!org) throw new NotFoundError()

//   return org
// })
