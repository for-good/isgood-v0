import { Ctx, resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ firstName, lastName, email, password }, ctx: Ctx) => {
    const hashedPassword = await SecurePassword.hash(password)

    const fullName = firstName + "" + lastName

    const status = "active"

    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        firstName,
        lastName,
        fullName,
        hashedPassword,
        status,
        roles: "ADMIN",
      },
      select: { id: true, fullName: true, email: true, roles: true },
    })

    await ctx.session.$create({ userId: user.id, role: [user.roles] })
    return user
  }
)
