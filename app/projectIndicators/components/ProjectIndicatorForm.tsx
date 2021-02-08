import getProjects from "app/projects/queries/getProjects"
import { useQuery } from "blitz"
import React from "react"

type ProjectIndicatorFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ProjectIndicatorForm = ({ initialValues, onSubmit }: ProjectIndicatorFormProps) => {
  const [allProjects] = useQuery(getProjects, {where: {}})
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <label>Enter Project Indicator Name:</label><br/>
      <input name="ProjectIndicator Name"  placeholder="ProjectIndicator Name" /><br/>
      {/* <div>{JSON.stringify(initialValues)}</div> */}
      <button>Submit</button>
    </form>
  )
}

export default ProjectIndicatorForm
