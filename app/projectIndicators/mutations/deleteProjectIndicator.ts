import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteProjectIndicatorInput = Pick<Prisma.ProjectIndicatorDeleteArgs, "where">

export default async function deleteProjectIndicator(
  { where }: DeleteProjectIndicatorInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const projectIndicator = await db.projectIndicator.delete({ where })

  return projectIndicator
}
