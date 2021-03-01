import getDemographics from "app/demographics/queries/getDemographics"
import { useQuery } from "blitz"
import React from "react"
export { FORM_ERROR } from "app/core/components/Form"

type BeneficiaryFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export const BeneficiaryForm = ({ initialValues, onSubmit }: BeneficiaryFormProps) => {
  const [allDemographics] = useQuery(getDemographics, { where: {} })
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <label>Enter The Beneficiary Name:</label>
      <br />
      <input name="Beneficiary Name" placeholder="Beneficiary Name" />
      <br />

      <label>Select a Demographic:</label>
      <br />
      <select name="options">
        <option defaultValue="-Please Select - ">Please Select</option>
        {allDemographics.demographics.map((demographic) => (
          <option value={demographic.id} key={demographic.id}>
            {demographic.name}
          </option>
        ))}
      </select>
      <br />

      <button>Submit</button>
    </form>
  )
}

export default BeneficiaryForm
