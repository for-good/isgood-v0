import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProjectIndicator from "app/projectIndicators/mutations/createProjectIndicator"
import ProjectIndicatorForm from "app/projectIndicators/components/ProjectIndicatorForm"

const NewProjectIndicatorPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectIndicatorMutation] = useMutation(createProjectIndicator)

  return (
    <div>
      <h1>Create New ProjectIndicator</h1>

      <ProjectIndicatorForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const projectIndicator = await createProjectIndicatorMutation({
              data:
              { 
                name: event.target[0].value, 
              }
            })
            alert("Success!" + JSON.stringify(projectIndicator))
            router.push(`/projectIndicators/${projectIndicator.id}`)
          } catch (error) {
            alert("Error creating projectIndicator " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projectIndicators">
          <a>ProjectIndicators</a>
        </Link>
      </p>
    </div>
  )
}

NewProjectIndicatorPage.getLayout = (page) => (
  <Layout title={"Create New ProjectIndicator"}>{page}</Layout>
)

export default NewProjectIndicatorPage
