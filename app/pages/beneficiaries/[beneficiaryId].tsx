import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBeneficiary from "app/beneficiaries/queries/getBeneficiary"
import deleteBeneficiary from "app/beneficiaries/mutations/deleteBeneficiary"

export const Beneficiary = () => {
  const router = useRouter()
  const beneficiaryId = useParam("beneficiaryId", "number")
  const [deleteBeneficiaryMutation] = useMutation(deleteBeneficiary)
  const [beneficiary] = useQuery(getBeneficiary, { id: beneficiaryId })

  return (
    <>
      <Head>
        <title>Beneficiary {beneficiary.id}</title>
      </Head>

      <div>
        <h1>Beneficiary {beneficiary.id}</h1>
        <pre>{JSON.stringify(beneficiary, null, 2)}</pre>

        <Link href={`/beneficiaries/${beneficiary.id}/edit`}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteBeneficiaryMutation({ id: beneficiary.id })
              router.push("/beneficiaries")
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

const ShowBeneficiaryPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/beneficiaries">
          <a>Beneficiaries</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Beneficiary />
      </Suspense>
    </div>
  )
}

ShowBeneficiaryPage.authenticate = true
ShowBeneficiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowBeneficiaryPage
