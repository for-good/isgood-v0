import getBeneficiaries from "app/beneficiaries/queries/getBeneficiaries"
import { useQuery } from "blitz"
import React from "react"

type DemographicFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const DemographicForm = ({ initialValues, onSubmit }: DemographicFormProps) => {
  const [allbeneficiries] = useQuery(getBeneficiaries, {where: {}})
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <label>Enter The Beneficiary Name:</label><br/>
      <input name="Demographic Name"  placeholder="Demographic Name" /><br/>
      
      <button>Submit</button>
    </form>
  )
}

export default DemographicForm
