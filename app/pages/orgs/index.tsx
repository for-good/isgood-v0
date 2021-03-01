import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrgs from "app/orgs/queries/getOrgs"

const ITEMS_PER_PAGE = 100

export const OrgsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orgs, hasMore }] = usePaginatedQuery(getOrgs, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orgs.map((org) => (
          <li key={org.id}>
            <Link href={`/orgs/${org.id}`}>
              <a>{org.name}</a>
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

const OrgsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Orgs</title>
      </Head>

      <div>
        <p>
          <Link href="/orgs/new">
            <a>Create Org</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OrgsList />
        </Suspense>
      </div>
    </>
  )
}

OrgsPage.authenticate = true
OrgsPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrgsPage
