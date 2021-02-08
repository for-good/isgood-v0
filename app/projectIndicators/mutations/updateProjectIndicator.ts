import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateProjectIndicatorInput = Pick<Prisma.ProjectIndicatorUpdateArgs, "where" | "data">

export default async function updateProjectIndicator(
  { where, data }: UpdateProjectIndicatorInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const projectIndicator = await db.projectIndicator.update({ where, data })

  return projectIndicator
}
