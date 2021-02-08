import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getBeneficiary from "app/beneficiaries/queries/getBeneficiary"
import updateBeneficiary from "app/beneficiaries/mutations/updateBeneficiary"
import BeneficiaryForm from "app/beneficiaries/components/BeneficiaryForm"

export const EditBeneficiary = () => {
  const router = useRouter()
  const beneficiaryId = useParam("beneficiaryId", "number")
  const [beneficiary, { setQueryData }] = useQuery(getBeneficiary, { where: { id: beneficiaryId } })
  const [updateBeneficiaryMutation] = useMutation(updateBeneficiary)

  return (
    <div>
      <h1>Edit Beneficiary {beneficiary.id}</h1>
      {/* <pre>{JSON.stringify(beneficiary)}</pre> */}

      <BeneficiaryForm
        initialValues={beneficiary}
        onSubmit={async (event) => {
          try {
            const updated = await updateBeneficiaryMutation({
              where: { id: beneficiary.id },
              data: { name: event.target[0].value, },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/beneficiaries/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing beneficiary " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditBeneficiaryPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditBeneficiary />
      </Suspense>

      <p>
        <Link href="/beneficiaries">
          <a>Beneficiaries</a>
        </Link>
      </p>
    </div>
  )
}

EditBeneficiaryPage.getLayout = (page) => <Layout title={"Edit Beneficiary"}>{page}</Layout>

export default EditBeneficiaryPage
