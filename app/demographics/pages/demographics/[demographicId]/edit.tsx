import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getDemographic from "app/demographics/queries/getDemographic"
import updateDemographic from "app/demographics/mutations/updateDemographic"
import DemographicForm from "app/demographics/components/DemographicForm"

export const EditDemographic = () => {
  const router = useRouter()
  const demographicId = useParam("demographicId", "number")
  const [demographic, { setQueryData }] = useQuery(getDemographic, { where: { id: demographicId } })
  const [updateDemographicMutation] = useMutation(updateDemographic)

  return (
    <div>
      <h1>Edit Demographic {demographic.id}</h1>
      {/* <pre>{JSON.stringify(demographic)}</pre> */}

      <DemographicForm
        initialValues={demographic}
        onSubmit={async (event) => {
          try {
            const updated = await updateDemographicMutation({
              where: { id: demographic.id },
              data: { name: event.target[0].value, },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/demographics/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing demographic " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
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

EditDemographicPage.getLayout = (page) => <Layout title={"Edit Demographic"}>{page}</Layout>

export default EditDemographicPage
