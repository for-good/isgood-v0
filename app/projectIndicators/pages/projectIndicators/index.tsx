import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getProjectIndicators from "app/projectIndicators/queries/getProjectIndicators"

const ITEMS_PER_PAGE = 100

export const ProjectIndicatorsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projectIndicators, hasMore }] = usePaginatedQuery(getProjectIndicators, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {projectIndicators.map((projectIndicator) => (
          <li key={projectIndicator.id}>
            <Link href={`/projectIndicators/${projectIndicator.id}`}>
              <a>{projectIndicator.name}</a>
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

const ProjectIndicatorsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/projectIndicators/new">
          <a>Create ProjectIndicator</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProjectIndicatorsList />
      </Suspense>
    </div>
  )
}

ProjectIndicatorsPage.getLayout = (page) => <Layout title={"ProjectIndicators"}>{page}</Layout>

export default ProjectIndicatorsPage
