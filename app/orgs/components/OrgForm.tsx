import LabeledTextField from "app/core/components/LabeledTextField"
import { useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"
import getProjects from "app/projects/queries/getProjects"
export { FORM_ERROR } from "app/core/components/Form"

type OrgFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

let OrgForm
export default OrgForm = ({ initialValues, onSubmit }: OrgFormProps) => {
  const router = useRouter()

  const [allProjects] = useQuery(getProjects, { where: {} })

  //alert(JSON.stringify(allProjects.Projects))
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <label>Enter The Org Name:</label>
      <br />
      <input name="Org Name" placeholder="Org Name" />
      <br />

      <label>Enter The Org url:</label>
      <br />
      <input name="Org url" placeholder="Org url" />
      <br />

      <label>Enter The Org plan:</label>
      <br />
      <input name="Org plan" placeholder="Org plan" />
      <br />

      <label>Enter The Org plan status:</label>
      <br />
      <input name="Org plan satus" placeholder="Org plan status" />
      <br />

      <label>Select a project:</label>
      <br />
      <select name="options">
        <option defaultValue="-Please Select - ">Please Select</option>
        {allProjects.projects.map((project) => (
          <option value={project.id} key={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <br />
      <button>Submit</button>
    </form>
  )
}

export const OrgFormPage = () => (
  <Suspense fallback={<div />}>
    <OrgForm />
  </Suspense>
)
