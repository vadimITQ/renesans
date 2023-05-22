import {IAmlCheck, IAmlCheckResponse} from "../../../../services/aml-check/types";


export function prepareAmlCheckData(amlResponse: IAmlCheckResponse): IAmlCheck[] {

  const { amlChecks} = amlResponse

  return amlChecks
}
