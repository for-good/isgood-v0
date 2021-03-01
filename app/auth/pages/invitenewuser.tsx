import React from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { InviteNewUser } from "app/auth/components/InviteNewUser"

const SignupNewUserPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <InviteNewUser onSuccess={() => router.push("/")} />
    </div>
  )
}

SignupNewUserPage.getLayout = (page) => <Layout title="Invite new user">{page}</Layout>

export default SignupNewUserPage
