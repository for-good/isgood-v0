import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDemographic from "app/demographics/queries/getDemographic"
import updateDemographic from "app/demographics/mutations/updateDemographic"
import { DemographicForm, FORM_ERROR } from "app/demographics/components/DemographicForm"

export const EditDemographic = () => {
  const router = useRouter()
  const demographicId = useParam("demographicId", "number")
  const [demographic, { setQueryData }] = useQuery(getDemographic, { id: demographicId })
  const [updateDemographicMutation] = useMutation(updateDemographic)

  return (
    <>
      <Head>
        <title>Edit Demographic {demographic.id}</title>
      </Head>

      <div>
        <h1>Edit Demographic {demographic.id}</h1>
        <pre>{JSON.stringify(demographic)}</pre>

        <DemographicForm
          submitText="Update Demographic"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDemographic}
          initialValues={demographic}
          onSubmit={async (values) => {
            try {
              const updated = await updateDemographicMutation({
                id: demographic.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(`/demographics/${updated.id}`)
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

const EditDemographicPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDemographic />
      </Suspense>

      <p>
        <Link href="/demographics">
          <a>Demographics</a>
        </Link>
      </p>
    </div>
  )
}

EditDemographicPage.authenticate = true
EditDemographicPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDemographicPage
