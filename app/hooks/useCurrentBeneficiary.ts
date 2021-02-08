import { useQuery } from "blitz"
import getBeneficiaries from "../beneficiaries/queries/getBeneficiaries"

export const useCurrentBeneficiary = () => {
  const [userBeneficiary] = useQuery(getBeneficiaries,{})
  return userBeneficiary
}