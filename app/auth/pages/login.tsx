import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import React, { Suspense } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <LoginForm
        onSuccess={() => {
          const next = (router.query.next as string) ?? "/"
          router.push(next)
        }}
      />
    </div>
  )
}

// LoginPage.redirectAuthenticatedTo = "/"
const LoginPageOne: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    </div>
  )
}
LoginPageOne.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPageOne
