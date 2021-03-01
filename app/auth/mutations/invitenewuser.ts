import { Ctx } from "blitz"
import db, { Role } from "db"
import { SignupNewUser, SignupTypeNewUser } from "app/auth/validationsuser"

export default async function invitenewuser(input: SignupTypeNewUser, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, role } = SignupNewUser.parse(input)

  const user = await db.user.create({
    data: { email: email.toLowerCase(), role: role },
    select: { id: true, name: true, email: true, role: true },
  })

  await session.$create({ userId: user.id, name: user.name, role: user.role })

  return user
}
