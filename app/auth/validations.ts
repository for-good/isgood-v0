import * as z from "zod"

export const SignupInput = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(10).max(100),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
  //name: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>
