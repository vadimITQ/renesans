
import { GetPaymentsResponse } from '../../../../../shared/models/manual-checks-models';

export function sortPaymentData(paymentData: GetPaymentsResponse[] | null | undefined): GetPaymentsResponse[] | null | undefined {
    if (!paymentData)
      return paymentData;
    return paymentData.sort((a, b) => {
      if (a.manualParse === 1 && b.manualParse !== 1) {
        return -1;
      }
      if (b.manualParse === 1 && a.manualParse !== 1){
        return 1;
      }
      if (a.manualParse === 1 && b.manualParse === 1){
        return 0;
      }
      if ((a.manualParse === 2 || a.manualParse === 3) && (b.manualParse === 2 || b.manualParse === 3)){
        if (a.status === b.status){
          return 0;
        }
        if (a.status === "Успешные статусы платежа/перевода"){
          return -1;
        }
        else {
          return 1;
        }
      }
      return 0;
    });
};

export function setRowStatuses(paymentData: GetPaymentsResponse[] | null | undefined): GetPaymentsResponse[] | null | undefined {
  paymentData?.forEach(payment => {
    if (payment.manualParse === 1){
      return;
    }
    if ([2, 3].includes(payment.manualParse ?? -1)){
      payment.status === "Ошибочные статусы платежа/перевода" ? payment.rowStatus = "erroneous": payment.status = "Успешные статусы платежа/перевода" ? payment.rowStatus = "successful": "";
    }
  })
  return paymentData;
}