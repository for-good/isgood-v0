import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDemographic from "app/demographics/mutations/createDemographic"
import { DemographicForm, FORM_ERROR } from "app/demographics/components/DemographicForm"

const NewDemographicPage: BlitzPage = () => {
  const router = useRouter()
  const [createDemographicMutation] = useMutation(createDemographic)

  return (
    <div>
      <h1>Create New Demographic</h1>

      <DemographicForm
        submitText="Create Demographic"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDemographic}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const demographic = await createDemographicMutation(values)
            router.push(`/demographics/${demographic.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
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

NewDemographicPage.authenticate = true
NewDemographicPage.getLayout = (page) => <Layout title={"Create New Demographic"}>{page}</Layout>

export default NewDemographicPage
