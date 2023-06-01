import {IBankOpsCheck, IBankOpsCheckResponse} from "../../../../services/bank-ops-check/types";


export function prepareBankOpsCheckData(bankOpsResponse: IBankOpsCheckResponse): IBankOpsCheck[] {

  const { bankOpsChecks} = bankOpsResponse

  return bankOpsChecks
}
