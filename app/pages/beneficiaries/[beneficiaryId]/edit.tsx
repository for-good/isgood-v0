import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getBeneficiary from "app/beneficiaries/queries/getBeneficiary"
import updateBeneficiary from "app/beneficiaries/mutations/updateBeneficiary"
import { BeneficiaryForm, FORM_ERROR } from "app/beneficiaries/components/BeneficiaryForm"

export const EditBeneficiary = () => {
  const router = useRouter()
  const beneficiaryId = useParam("beneficiaryId", "number")
  const [beneficiary, { setQueryData }] = useQuery(getBeneficiary, { id: beneficiaryId })
  const [updateBeneficiaryMutation] = useMutation(updateBeneficiary)

  return (
    <>
      <Head>
        <title>Edit Beneficiary {beneficiary.id}</title>
      </Head>

      <div>
        <h1>Edit Beneficiary {beneficiary.id}</h1>
        <pre>{JSON.stringify(beneficiary)}</pre>

        <BeneficiaryForm
          // submitText="Update Beneficiary"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateBeneficiary}
          initialValues={beneficiary}
          onSubmit={async (event) => {
            try {
              const updated = await updateBeneficiaryMutation({
                where: { id: beneficiary.id },
                data: { name: event.target[0].value },
              })
              await setQueryData(updated)
              router.push(`/beneficiaries/${updated.id}`)
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
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

EditBeneficiaryPage.authenticate = true
EditBeneficiaryPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBeneficiaryPage
