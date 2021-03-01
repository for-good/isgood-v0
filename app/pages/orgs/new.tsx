import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrg from "app/orgs/mutations/createOrg"
import OrgForm from "app/orgs/components/OrgForm"
import React, { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewOrgPage: BlitzPage = () => {
  const router = useRouter()
  const [createOrgMutation] = useMutation(createOrg)
  const currentUser = useCurrentUser()
  return (
    <div>
      <h1>Create New Org</h1>
      <OrgForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const org = await createOrgMutation({
              data: {
                name: event.target[0].value,

                url: event.target[1].value,

                plan: event.target[2].value,

                planStatus: event.target[3].value,

                projects: { connect: { id: parseInt(event.target[4].value) } },

                user: { connect: { id: currentUser?.id } },
              },
            })

            alert("Success!" + JSON.stringify(org))
            router.push(`/orgs/${org.id}`)
          } catch (error) {
            alert("Error creating Org " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/orgs">
          <a>Orgs</a>
        </Link>
      </p>
    </div>
  )
}
const NewOrgPage1: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewOrgPage />
      </Suspense>
    </div>
  )
}

NewOrgPage1.getLayout = (page) => <Layout title={"Create New Org"}>{page}</Layout>

export default NewOrgPage1
