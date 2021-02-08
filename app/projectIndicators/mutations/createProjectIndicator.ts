import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateProjectIndicatorInput = Pick<Prisma.ProjectIndicatorCreateArgs, "data">
export default async function createProjectIndicator(
  { data }: CreateProjectIndicatorInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const projectIndicator = await db.projectIndicator.create({ data })

  return projectIndicator
}
