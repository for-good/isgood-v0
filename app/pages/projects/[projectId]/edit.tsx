import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import updateProject from "app/projects/mutations/updateProject"
import ProjectForm from "app/projects/components/ProjectForm"

export const EditProject = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [project, { setQueryData }] = useQuery(getProject, { where: { id: projectId } })
  const [updateProjectMutation] = useMutation(updateProject)

  return (
    <>
      <Head>
        <title>Edit Project {project.id}</title>
      </Head>

      <div>
        <h1>Edit Project {project.id}</h1>
        <pre>{JSON.stringify(project)}</pre>

        <ProjectForm
          // submitText="Update Project"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateProject}
          initialValues={project}
          onSubmit={async (event) => {
            try {
              const updated = await updateProjectMutation({
                where: { id: project.id },
                data: {
                  name: event.target[0].value,
                  description: event.target[1].value,
                  projecimpacts: event.target[2].value,
                  projectoutcomes: event.target[3].value,
                  beneficiaries: { connect: { id: parseInt(event.target[4].value) } },
                  projectindicators: event.target[5].value,
                },
              })
              alert("Success!" + JSON.stringify(updated))
              router.push(`/projects/${updated.id}`)
            } catch (error) {
              console.log(error)
              alert("Error editing project " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </div>
    </>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}

EditProjectPage.authenticate = true
EditProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProjectPage
