import getDemographics from "app/demographics/queries/getDemographics"
import getProjects from "app/projects/queries/getProjects"
import { useQuery } from "blitz"
import React from "react"

type BeneficiaryFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const BeneficiaryForm = ({ initialValues, onSubmit }: BeneficiaryFormProps) => {

  const [allDemographics] = useQuery(getDemographics, {where: {}})
  const [allProjects] = useQuery(getProjects, {where: {}})
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
    <label>Enter The Beneficiary Name:</label><br/>
      <input name="Beneficiary Name"  placeholder="Beneficiary Name" /><br/>
      
        <label>Select a Demographic:</label><br/>
        <select name="options">{allDemographics.demographics.map((demographic) => 
                <option value = {demographic.id} key={demographic.id}>
                      {demographic.name}
                </option>
                )}
        </select><br/>
        
      <button>Submit</button>
    </form>
  )
}

export default BeneficiaryForm
