import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProjectIndicator from "app/projectIndicators/queries/getProjectIndicator"
import deleteProjectIndicator from "app/projectIndicators/mutations/deleteProjectIndicator"

export const ProjectIndicator = () => {
  const router = useRouter()
  const projectIndicatorId = useParam("projectIndicatorId", "number")
  const [projectIndicator] = useQuery(getProjectIndicator, { where: { id: projectIndicatorId } })
  const [deleteProjectIndicatorMutation] = useMutation(deleteProjectIndicator)

  return (
    <div>
      <h1>ProjectIndicator {projectIndicator.id}</h1>
      <pre>{JSON.stringify(projectIndicator, null, 2)}</pre>

      <Link href={`/projectIndicators/${projectIndicator.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProjectIndicatorMutation({ where: { id: projectIndicator.id } })
            router.push("/projectIndicators")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProjectIndicatorPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/projectIndicators">
          <a>ProjectIndicators</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectIndicator />
      </Suspense>
    </div>
  )
}

ShowProjectIndicatorPage.getLayout = (page) => <Layout title={"ProjectIndicator"}>{page}</Layout>

export default ShowProjectIndicatorPage
