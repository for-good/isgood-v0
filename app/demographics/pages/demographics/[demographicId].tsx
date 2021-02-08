import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getDemographic from "app/demographics/queries/getDemographic"
import deleteDemographic from "app/demographics/mutations/deleteDemographic"

export const Demographic = () => {
  const router = useRouter()
  const demographicId = useParam("demographicId", "number")
  const [demographic] = useQuery(getDemographic, { where: { id: demographicId } })
  const [deleteDemographicMutation] = useMutation(deleteDemographic)

  return (
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
            await deleteDemographicMutation({ where: { id: demographic.id } })
            router.push("/demographics")
          }
        }}
      >
        Delete
      </button>
    </div>
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

ShowDemographicPage.getLayout = (page) => <Layout title={"Demographic"}>{page}</Layout>

export default ShowDemographicPage
