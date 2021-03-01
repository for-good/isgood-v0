import React, { Suspense } from "react"
import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupUserForm } from "app/auth/components/SignupUserForm"

const SignupNewUserPageOne: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupUserForm onSuccess={() => router.push("/")} />
    </div>
  )
}

const SignupNewUserPageTwo: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupNewUserPageOne />
      </Suspense>
    </div>
  )
}

SignupNewUserPageTwo.getLayout = (page) => <Layout title="Create New User">{page}</Layout>

export default SignupNewUserPageTwo
