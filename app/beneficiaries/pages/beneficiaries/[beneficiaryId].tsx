import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getBeneficiary from "app/beneficiaries/queries/getBeneficiary"
import deleteBeneficiary from "app/beneficiaries/mutations/deleteBeneficiary"

export const Beneficiary = () => {
  const router = useRouter()
  const beneficiaryId = useParam("beneficiaryId", "number")
  const [beneficiary] = useQuery(getBeneficiary, { where: { id: beneficiaryId } })
  const [deleteBeneficiaryMutation] = useMutation(deleteBeneficiary)

  return (
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
            await deleteBeneficiaryMutation({ where: { id: beneficiary.id } })
            router.push("/beneficiaries")
          }
        }}
      >
        Delete
      </button>
    </div>
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

ShowBeneficiaryPage.getLayout = (page) => <Layout title={"Beneficiary"}>{page}</Layout>

export default ShowBeneficiaryPage
