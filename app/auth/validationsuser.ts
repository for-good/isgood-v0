import * as z from "zod"

export const SignupInputUser = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.enum([
    "ADMIN",
    "USER",
    "ORGANIZATION_OWNER",
    "PROJECT_OWNER",
    "PROJECT_MANAGER",
    "COLLABORATOR",
    "GUEST_VIEW",
  ]),
})
export type SignupInputTypeUser = z.infer<typeof SignupInputUser>

export const LoginInputUser = z.object({
  email: z.string().email(),
  role: z.enum([
    "ADMIN",
    "USER",
    "ORGANIZATION_OWNER",
    "PROJECT_OWNER",
    "PROJECT_MANAGER",
    "COLLABORATOR",
    "GUEST_VIEW",
  ]),
})

export type LoginInputTypeUser = z.infer<typeof LoginInputUser>

export const SignupNewUser = z.object({
  email: z.string().email(),
  role: z.enum([
    "ADMIN",
    "USER",
    "ORGANIZATION_OWNER",
    "PROJECT_OWNER",
    "PROJECT_MANAGER",
    "COLLABORATOR",
    "GUEST_VIEW",
  ]),
})

export type SignupTypeNewUser = z.infer<typeof SignupNewUser>

export const CreateBeneficiary = z.object({
  name: z.string(),
})

export type CreateBeneficiaryDemographic = z.infer<typeof CreateBeneficiary>
