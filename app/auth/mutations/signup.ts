import { Ctx, SecurePassword } from "blitz"
import db from "db"
import { SignupInput, SignupInputType } from "app/auth/validations"

export default async function signup(input: SignupInputType, { session }: Ctx) {
  // This throws an error if input is invalid
  const { email, firstName, lastName, password } = SignupInput.parse(input)

  const fullName = firstName + "" + lastName

  const status = "active"

  const hashedPassword = await SecurePassword.hash(password)
  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      firstName: firstName,
      lastName,
      fullName,
      hashedPassword,
      status,
      roles: "ADMIN",
    },
    select: { id: true, fullName: true, email: true, roles: true },
  })

  await session.create({ userId: user.id, roles: [user.roles] })

  return user
}
