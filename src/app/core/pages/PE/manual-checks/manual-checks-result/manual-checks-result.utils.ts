
import { ISearchPaymentsResponse } from 'src/app/core/services/search-payment/types';
import { GetPaymentsResponse } from '../../../../../shared/models/manual-checks-models';

export function sortPaymentData(paymentData: ISearchPaymentsResponse[] | null | undefined): ISearchPaymentsResponse[] | null | undefined {
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
        if (a.statusCode === b.statusCode){
          return 0;
        }
        if (a.statusCode === "Успешные статусы платежа/перевода"){
          return -1;
        }
        else {
          return 1;
        }
      }
      return 0;
    });
};

export function setRowStatuses(paymentData: ISearchPaymentsResponse[] | null | undefined): ISearchPaymentsResponse[] | null | undefined {
  paymentData?.forEach(payment => {
    if (payment.manualParse === 1){
      return;
    }
    if ([2, 3].includes(payment.manualParse ?? -1)){
      payment.statusCode === "Ошибочные статусы платежа/перевода" ? payment.rowStatus = "erroneous": payment.statusCode = "Успешные статусы платежа/перевода" ? payment.rowStatus = "successful": "";
    }
  })
  return paymentData;
}

export function checkObjectPropertiesOnEmpty(object: any): any{
  Object.getOwnPropertyNames(object).forEach(key => {
    console.log(key);
    if (object[key] === undefined){
      delete object[key];
    }
  })
  return object;
}