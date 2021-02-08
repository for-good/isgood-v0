import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getDemographics from "app/demographics/queries/getDemographics"

const ITEMS_PER_PAGE = 100

export const DemographicsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ demographics, hasMore }] = usePaginatedQuery(getDemographics, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {demographics.map((demographic) => (
          <li key={demographic.id}>
            <Link href={`/demographics/${demographic.id}`}>
              <a>{demographic.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const DemographicsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/demographics/new">
          <a>Create Demographic</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <DemographicsList />
      </Suspense>
    </div>
  )
}

DemographicsPage.getLayout = (page) => <Layout title={"Demographics"}>{page}</Layout>

export default DemographicsPage
