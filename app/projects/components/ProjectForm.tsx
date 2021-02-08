import LabeledTextField from "app/components/LabeledTextField"
import { useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"
import getBeneficiaries from "app/beneficiaries/queries/getBeneficiaries"
import getProjectIndicators from "app/projectIndicators/queries/getProjectIndicators"

type ProjectFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}
let ProjectForm
export default ProjectForm = ({ initialValues, onSubmit }: ProjectFormProps) => {
  const router = useRouter()
  //const [projectId] = useQuery(getProject, {where: {id: 33}})
  const [allBeneficiaries] = useQuery(getBeneficiaries, {where: {}})
  const [allProjectindicators] = useQuery(getProjectIndicators,{where: {}} ) 
  //alert(JSON.stringify(allBeneficiaries.beneficiaries))
  return (
    
    <form
      onSubmit={(event) => {event.preventDefault()
        onSubmit(event)
      }}>
      <label>Enter The Project Name:</label><br/>
      <input name="Project Name"  placeholder="Project Name" /><br/>

      <label>Enter The Project Description:</label><br/>
      <textarea name="Project Description"  placeholder="Project Description" /><br/>

      <label>Enter The Project Impacts:</label><br/>
      <textarea name="Project Impacts"  placeholder="Project Impacts" /><br/>

      <label>Enter The Project Outcomes:</label><br/>
      <textarea name="Project Outcomes"  placeholder="Project Outcomes" /><br/>

        <label>Select a Beneficiary:</label><br/>
        <select  name="options">{allBeneficiaries.beneficiaries.map((beneficiary) => 
                <option value = {beneficiary.id} key={beneficiary.id}>
                      {beneficiary.name}
                </option>
                )}
        </select><br/>
        <label>Select a Project Indicator:</label><br/>
        <select  name="options">{allProjectindicators.projectIndicators.map((projectIndicator) => 
                <option value = {projectIndicator.id} key={projectIndicator.id}>
                      {projectIndicator.name}
                </option>
                )}
        </select><br/>
      <button>Submit</button>
    </form>
  )
}

export const ProjectFormPage = () => (
  <Suspense fallback={<div />}>
    <ProjectForm />
  </Suspense>
)
