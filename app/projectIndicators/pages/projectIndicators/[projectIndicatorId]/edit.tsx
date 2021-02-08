import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProjectIndicator from "app/projectIndicators/queries/getProjectIndicator"
import updateProjectIndicator from "app/projectIndicators/mutations/updateProjectIndicator"
import ProjectIndicatorForm from "app/projectIndicators/components/ProjectIndicatorForm"

export const EditProjectIndicator = () => {
  const router = useRouter()
  const projectIndicatorId = useParam("projectIndicatorId", "number")
  const [projectIndicator, { setQueryData }] = useQuery(getProjectIndicator, {
    where: { id: projectIndicatorId },
  })
  const [updateProjectIndicatorMutation] = useMutation(updateProjectIndicator)

  return (
    <div>
      <h1>Edit ProjectIndicator {projectIndicator.id}</h1>
      <pre>{JSON.stringify(projectIndicator)}</pre>

      <ProjectIndicatorForm
        initialValues={projectIndicator}
        onSubmit={async (event) => {
          try {
            const updated = await updateProjectIndicatorMutation({
              where: { id: projectIndicator.id },
              data: { name: event.target[0].value, },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/projectIndicators/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing projectIndicator " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditProjectIndicatorPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProjectIndicator />
      </Suspense>

      <p>
        <Link href="/projectIndicators">
          <a>ProjectIndicators</a>
        </Link>
      </p>
    </div>
  )
}

EditProjectIndicatorPage.getLayout = (page) => (
  <Layout title={"Edit ProjectIndicator"}>{page}</Layout>
)

export default EditProjectIndicatorPage
