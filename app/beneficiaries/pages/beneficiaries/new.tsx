import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createBeneficiary from "app/beneficiaries/mutations/createBeneficiary"
import BeneficiaryForm from "app/beneficiaries/components/BeneficiaryForm"

const NewBeneficiaryPage: BlitzPage = () => {
  const router = useRouter()
  const [createBeneficiaryMutation] = useMutation(createBeneficiary)

  return (
    <div>
      <h1>Create New Beneficiary</h1>

      <BeneficiaryForm
        initialValues={{}}
        onSubmit={async (event) => {
          try {
            const beneficiary = await createBeneficiaryMutation({ 
              data:  {
                name: event.target[0].value,
               
                demographics:{ connect: { id: parseInt(event.target[1].value)}},
               
              }
             })
            alert("Success!" + JSON.stringify(beneficiary))
            router.push(`/beneficiaries/${beneficiary.id}`)
          } catch (error) {
            alert("Error creating beneficiary " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/beneficiaries">
          <a>Beneficiaries</a>
        </Link>
      </p>
    </div>
  )
}

NewBeneficiaryPage.getLayout = (page) => <Layout title={"Create New Beneficiary"}>{page}</Layout>

export default NewBeneficiaryPage
