import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrg from "app/orgs/queries/getOrg"
import deleteOrg from "app/orgs/mutations/deleteOrg"

export const Org = () => {
  const router = useRouter()
  const orgId = useParam("orgId", "number")
  const [deleteOrgMutation] = useMutation(deleteOrg)
  const [org] = useQuery(getOrg, { id: orgId })

  return (
    <>
      <Head>
        <title>Org {org.id}</title>
      </Head>

      <div>
        <h1>Org {org.id}</h1>
        <pre>{JSON.stringify(org, null, 2)}</pre>

        <Link href={`/orgs/${org.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrgMutation({ id: org.id })
              router.push("/orgs")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowOrgPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/orgs">
          <a>Orgs</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Org />
      </Suspense>
    </div>
  )
}

ShowOrgPage.authenticate = true
ShowOrgPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOrgPage
