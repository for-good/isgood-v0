import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetProjectIndicatorInput = Pick<Prisma.FindFirstProjectIndicatorArgs, "where">

export default async function getProjectIndicator({ where }: GetProjectIndicatorInput, ctx: Ctx) {
  ctx.session.authorize()

  const projectIndicator = await db.projectIndicator.findFirst({ where })

  if (!projectIndicator) throw new NotFoundError()

  return projectIndicator
}
