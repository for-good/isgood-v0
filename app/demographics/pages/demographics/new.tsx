import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createDemographic from "app/demographics/mutations/createDemographic"
import DemographicForm from "app/demographics/components/DemographicForm"
import React, { Suspense } from "react"

const NewDemographicPage: BlitzPage = () => {
  const router = useRouter()
  const [createDemographicMutation] = useMutation(createDemographic)

  return (
    <div>
      <h1>Create New Demographic</h1>

      <DemographicForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const demographic = await createDemographicMutation({ 
              data:
              { name: event.target[0].value, } 
             
             }) 
            alert("Success!" + JSON.stringify(demographic))
            router.push(`/demographics/${demographic.id}`)
          } catch (error) {
            alert("Error creating demographic " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/demographics">
          <a>Demographics</a>
        </Link>
      </p>
    </div>
  )
}

const NewDemographicPage1: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewDemographicPage />
      </Suspense>
    </div>
  )
}

NewDemographicPage1.getLayout = (page) => <Layout title={"Create New Demographic"}>{page}</Layout>

export default NewDemographicPage1
