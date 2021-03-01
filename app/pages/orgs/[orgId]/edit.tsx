import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrg from "app/orgs/queries/getOrg"
import updateOrg from "app/orgs/mutations/updateOrg"
import { FORM_ERROR } from "app/orgs/components/OrgForm"
import OrgForm from "app/orgs/components/OrgForm"

export const EditOrg = () => {
  const router = useRouter()
  const orgId = useParam("orgId", "number")
  const [org, { setQueryData }] = useQuery(getOrg, { where: { id: orgId } })
  const [updateOrgMutation] = useMutation(updateOrg)

  return (
    <>
      <Head>
        <title>Edit Org {org.id}</title>
      </Head>

      <div>
        <h1>Edit Org {org.id}</h1>
        <pre>{JSON.stringify(org)}</pre>

        <OrgForm
          // submitText="Update Org"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOrg}
          initialValues={org}
          onSubmit={async (event) => {
            try {
              const updated = await updateOrgMutation({
                where: { id: org.id },
                data: {
                  name: event.target[0].value,
                  url: event.target[1].value,
                  plan: event.target[2].value,
                  planStatus: event.target[3].value,
                  projects: { connect: { id: parseInt(event.target[4].value) } },
                },
              })
              // await setQueryData(updated)
              router.push(`/orgs/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditOrgPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrg />
      </Suspense>

      <p>
        <Link href="/orgs">
          <a>Orgs</a>
        </Link>
      </p>
    </div>
  )
}

EditOrgPage.authenticate = true
EditOrgPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOrgPage
