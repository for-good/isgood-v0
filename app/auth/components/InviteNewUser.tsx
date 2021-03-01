//app/auth/components
import React, { Suspense } from "react"
import { BlitzPage, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import invitenewuser from "../mutations/invitenewuser"
import { SignupNewUser } from "app/auth/validationsuser"
import LabeledSelectedField from "app/core/components/LabeledSelectedField"

type SignupFormProps = {
  onSuccess?: () => void
}

export const InviteNewUser = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(invitenewuser)
  return (
    <div>
      <h1>Invite New User</h1>
      <Form
        submitText="Invite new user"
        schema={SignupNewUser}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
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
        <LabeledTextField name="email" label="Email" type="email" placeholder="Email" />
        <LabeledSelectedField name="role" label="Select" type="select">
          <option defaultValue="-Please Select - ">Please Select</option>

          <option value="ADMIN">ADMIN</option>
          <option value="ORGANIZATION_OWNER">ORGANIZATION_OWNER</option>
          <option value="PROJECT_OWNER">PROJECT_OWNER</option>
          <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
          <option value="COLLABORATOR">COLLABORATOR</option>
          <option value="GUEST_VIEW">GUEST_VIEW</option>
          <option value="USER">USER</option>
        </LabeledSelectedField>
      </Form>
    </div>
  )
}

const InviteNewUserPage: BlitzPage = () => {
  return (
    <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Suspense fallback="Loading ...">
        <InviteNewUser />
      </Suspense>
    </div>
  )
}
export default InviteNewUserPage
