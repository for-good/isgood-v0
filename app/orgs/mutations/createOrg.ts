import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateOrgInput = Pick<Prisma.OrgCreateArgs, "data">
export default async function createOrg({ data }: CreateOrgInput, ctx: Ctx) {
  ctx.session.$authorize()

  const org = await db.org.create({ data })

  return org
}
