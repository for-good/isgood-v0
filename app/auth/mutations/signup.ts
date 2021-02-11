import { Ctx, SecurePassword } from "blitz"
import db from "db"
import { SignupInput, SignupInputType } from "app/auth/validations"

export default async function signup(input: SignupInputType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, name, password } = SignupInput.parse(input)

  const hashedPassword = await SecurePassword.hash(password)
  const user = await db.user.create({
    data: { email: email.toLowerCase(), name: name, hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  await session.create({ userId: user.id,name: user.name, roles: [user.role] })

  return user
}
