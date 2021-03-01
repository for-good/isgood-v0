import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDemographic from "app/demographics/queries/getDemographic"
import deleteDemographic from "app/demographics/mutations/deleteDemographic"

export const Demographic = () => {
  const router = useRouter()
  const demographicId = useParam("demographicId", "number")
  const [deleteDemographicMutation] = useMutation(deleteDemographic)
  const [demographic] = useQuery(getDemographic, { id: demographicId })

  return (
    <>
      <Head>
        <title>Demographic {demographic.id}</title>
      </Head>

      <div>
        <h1>Demographic {demographic.id}</h1>
        <pre>{JSON.stringify(demographic, null, 2)}</pre>

        <Link href={`/demographics/${demographic.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDemographicMutation({ id: demographic.id })
              router.push("/demographics")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowDemographicPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/demographics">
          <a>Demographics</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Demographic />
      </Suspense>
    </div>
  )
}

ShowDemographicPage.authenticate = true
ShowDemographicPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDemographicPage
