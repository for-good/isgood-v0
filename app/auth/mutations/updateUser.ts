import { resolver, SecurePassword } from "blitz"
import db from "db"
import { SignupInput } from "app/auth/validations"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, name, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password)
  const user = await db.user.update({
    where: { email: email },
    data: { name: name, hashedPassword: hashedPassword },
  })

  return user
})
