import { Link, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const User = () => {
  const currentUser = useCurrentUser()

  const [logoutMutation] = useMutation(logout)

  {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>

        <div>
          <Link href="/projects">
            <a className="button small">
              <strong>projects</strong>
            </a>
          </Link>
          <Link href="/beneficiaries">
            <a className="button small">
              <strong>beneficiaries</strong>
            </a>
          </Link>
          <Link href="/demographics">
            <a className="button small">
              <strong>demographics</strong>
            </a>
          </Link>
        </div>
      </>
    )
  }
}

const UserPage: BlitzPage = () => {
  return (
    <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Suspense fallback="Loading...">
        <User />
      </Suspense>
    </div>
  )
}

UserPage.getLayout = (page) => <Layout title="User Page">{page}</Layout>

export default UserPage
