import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getBeneficiaries from "app/beneficiaries/queries/getBeneficiaries"

const ITEMS_PER_PAGE = 100

export const BeneficiariesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ beneficiaries, hasMore }] = usePaginatedQuery(getBeneficiaries, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {beneficiaries.map((beneficiary) => (
          <li key={beneficiary.id}>
            <Link href={`/beneficiaries/${beneficiary.id}`}>
              <a>{beneficiary.name}</a>
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

const BeneficiariesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/beneficiaries/new">
          <a>Create Beneficiary</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <BeneficiariesList />
      </Suspense>
    </div>
  )
}

BeneficiariesPage.getLayout = (page) => <Layout title={"Beneficiaries"}>{page}</Layout>

export default BeneficiariesPage
