import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import React, { Suspense } from "react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <SignupForm onSuccess={() => router.push("/")} />
    </div>
  )
}

// SignupPage.redirectAuthenticatedTo = "/"

const SignupPageOne: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage />
      </Suspense>
    </div>
  )
}

SignupPageOne.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPageOne
