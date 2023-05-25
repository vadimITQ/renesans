import { DatePipe } from '@angular/common';
import { ISearchPayment } from '../../../../services/search-payment/types';
import { ISearchPaymentTableData } from '../search-payment.types';
import { manualChecksTransferTypes } from '../../../../../shared/variables/manual-checks-transfer-types';
import { DatePickerHelper } from '../../../../../shared/components/controls/date-picker/date-picker-helper';

export function prepareSearchPaymentsData(data: ISearchPayment[], datePipeRef?: DatePipe): ISearchPaymentTableData[] {
  return data.map(searchPayment => {
    const senderPayDoc = !!searchPayment.payDocs
      ? searchPayment.payDocs.filter(payDoc => searchPayment.sourceSystem === payDoc?.accountingSystem)[0]
      : null;
    const receiverPayDoc = !!searchPayment.payDocs
      ? searchPayment.payDocs.filter(payDoc => !!payDoc.accntDeb && !!payDoc.accntCre)[0]
      : null;
    const plannedDate = datePipeRef
      ? datePipeRef.transform(DatePickerHelper.parseFromLocaleStringToDate(searchPayment.plannedDate), 'dd-MM-yyyy') ?? ''
      : searchPayment.plannedDate;
    const appCreationTime = datePipeRef
      ? datePipeRef.transform(DatePickerHelper.parseFromLocaleStringToDate(searchPayment.pmtCreationTime), 'dd-MM-yyyy HH:mm:ss') ?? ''
      : DatePickerHelper.parseFromLocaleStringToDate(searchPayment.pmtCreationTime)?.toISOString() ?? '';
    const settlementDate = datePipeRef
      ? datePipeRef.transform(
          DatePickerHelper.parseFromLocaleStringToDate(searchPayment.paymentApplication?.sbp?.settlementDate),
          'dd-MM-yyyy',
        ) ?? ''
      : DatePickerHelper.parseFromLocaleStringToDate(searchPayment.paymentApplication?.sbp?.settlementDate)?.toISOString();
    return {
      appCreationTime: appCreationTime,
      plannedDate: plannedDate,
      statusCode: searchPayment.statusCodePE,
      type: manualChecksTransferTypes.find(({ value }) => value === searchPayment.paymentApplication.type)?.label ?? '',
      paymentSubType: searchPayment.paymentApplication?.paymentSubType,
      budgetPaymentSubtype: '', //searchPayment.paymentApplication?.budget?.budgetPaymentSubtype,
      paymentMethod: searchPayment.paymentApplication?.paymentMethod,
      amount: searchPayment.paymentApplication?.amount,
      fee: searchPayment.paymentApplication?.fee,
      ownFeeAmount: searchPayment.paymentApplication?.ownFeeAmount,
      creditFeeAmount: searchPayment.paymentApplication?.creditFeeAmount,
      bonusAmount: '', //searchPayment.paymentApplication?.bonus?.bonusAmount,
      bonusRub: '', //searchPayment.paymentApplication?.bonus?.bonusRub,
      loyaltyRate: '', // searchPayment.paymentApplication?.bonus?.loyaltyRate,
      bonusTypeName: '', //searchPayment.paymentApplication?.bonus?.bonusTypeName,
      bonusMaxPercent: '', //searchPayment.paymentApplication?.bonus?.bonusMaxPercent,
      paymentId: searchPayment.paymentID,
      idPH: searchPayment.paymentApplication?.ipt?.idPH,
      linkedChequeId: '', //searchPayment.paymentApplication?.ipt?.linkedChequeId,
      sourceSystem: searchPayment.sourceSystem,

      //источник
      docNumSender: senderPayDoc?.docNum ?? '',
      docIDSender: senderPayDoc?.docID ?? '',
      docStatusSender: senderPayDoc?.docStatus ?? '',
      accountSender: searchPayment.paymentApplication?.payer?.requisites?.account,
      sbpMtelSender: searchPayment.paymentApplication?.payer?.user?.sbpMtel ?? '',

      //приемник
      targetSystem: searchPayment.targetSystem,
      docNumReceiver: receiverPayDoc?.docNum ?? '',
      docIDReceiver: receiverPayDoc?.docID ?? '',
      docStatusReceiver: receiverPayDoc?.docStatus ?? '',
      accountReceiver: searchPayment.paymentApplication?.payee?.requisites?.account,
      sbpMtelReceiver: searchPayment.paymentApplication?.payee?.user?.sbpMtel ?? '',

      docNum: senderPayDoc?.docNum ?? '',
      docID: senderPayDoc?.docID ?? '',
      statusGl: searchPayment.statusCodePE === 2500 ? 'OK' : '',
      accntDeb: senderPayDoc?.accntDeb ?? '',
      accntCre: senderPayDoc?.accntCre ?? '',

      bankBIC: searchPayment.paymentApplication?.payee?.requisites?.bankBIC,
      serviceName: searchPayment.paymentApplication?.servicePayment?.service?.serviceName,
      operatorLegalName: '', //searchPayment.paymentApplication?.servicePayment?.operator?.operatorLegalName,
      iptID: searchPayment.paymentApplication?.applicationChannel?.iptID,
      cifID: searchPayment.paymentApplication?.payer?.user?.cifID ?? '',
      applicationID: searchPayment.paymentApplication?.applicationID,
      statusDescriptionPe: searchPayment.statusDescriptionPe ?? '',
      parentType: searchPayment.paymentApplication?.parentType,
      chequeNumber: '', //searchPayment.paymentApplication?.ipt?.chequeNumber,
      linkedChequeNumber: '', //searchPayment.paymentApplication?.ipt?.linkedChequeNumber,
      channelIP: searchPayment.paymentApplication?.applicationChannel?.channelIP,
      messageToReceiver: searchPayment.paymentApplication?.messageToReceiver,
      sbpTransactionId: '', //searchPayment.paymentApplication?.sbp?.sbpTransactionId,
      sbpWorkflowType: '', // searchPayment.paymentApplication?.sbp?.sbpWorkflowType,
      sbpFraudScore: '', // searchPayment.paymentApplication?.sbp?.sbpFraudScore,
      transactionStatus: '', // searchPayment.paymentApplication?.sbp?.transactionStatus,
      settlementDate: '', // settlementDate,
    };
  });
}
