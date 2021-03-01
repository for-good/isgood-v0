import Layout from "app/core/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProject from "app/projects/mutations/createProject"
import ProjectForm from "app/projects/components/ProjectForm"
import { useSession } from "blitz"
import React, { Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const [createProjectMutation] = useMutation(createProject)
  const session = useSession()
  const currentUser = useCurrentUser()

  return (
    <div>
      <h1>Create New Project</h1>
      <ProjectForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const project = await createProjectMutation({
              data: {
                name: event.target[0].value,

                description: event.target[1].value,

                projecimpacts: event.target[2].value,

                projectoutcomes: event.target[3].value,

                beneficiaries: { connect: { id: parseInt(event.target[4].value) } },

                projectindicators: event.target[5].value,

                user: { connect: { id: currentUser?.id } },
              },
            })

            alert("Success!" + JSON.stringify(project))
            router.push(`/projects/${project.id}`)
          } catch (error) {
            alert("Error creating project " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
      </p>
    </div>
  )
}
const NewProjectPage1: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewProjectPage />
      </Suspense>
    </div>
  )
}

NewProjectPage1.getLayout = (page) => <Layout title={"Create New Project"}>{page}</Layout>

export default NewProjectPage1
