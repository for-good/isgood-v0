import React, { Suspense } from "react"
import { BlitzPage, setQueryData, useMutation, useParam, useQuery, useRouter } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { Signup } from "app/auth/validations"
import Layout from "app/core/layouts/Layout"
import updateUser from "app/auth/mutations/updateUser"

type SignupUserFormProps = {
  onSuccess?: () => void
}

export const SignupUserForm = (props: SignupUserFormProps) => {
  const [signupMutation] = useMutation(updateUser)
  const router = useRouter()

  return (
    <div>
      <h1>Create User Account</h1>

      <Form
        submitText="Create New User Account"
        schema={Signup}
        initialValues={{ email: "", name: "", password: "" }}
        onSubmit={async (event) => {
          try {
            const updated = await signupMutation(event)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="name" label="Name" placeholder="Name" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

const SignupUserFormPage: BlitzPage = () => {
  return (
    <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Suspense fallback="Loading...">
        <SignupUserForm />
      </Suspense>
    </div>
  )
}

SignupUserFormPage.getLayout = (page) => <Layout title="SignUpForm Page">{page}</Layout>
export default SignupUserFormPage
