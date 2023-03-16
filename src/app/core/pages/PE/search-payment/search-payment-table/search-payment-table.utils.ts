import { ISearchPaymentsResponse } from '../../../../services/search-payment/types';
import { ISearchPayment } from '../search-payment.types';

export function prepareSearchPaymentsData(data: ISearchPaymentsResponse[]): ISearchPayment[] {
  return data.map(searchPayment => {
    const senderPayDoc = (searchPayment.payDocs ?? [])[0];

    // todo: fix me
    const receiverPayDoc = (searchPayment.payDocs ?? [])[0];

    return {
      appCreationTime: searchPayment.paymentApplication.appCreationTime,
      plannedDate: searchPayment.plannedDate,
      statusCode: searchPayment.statusCode,
      type: searchPayment.paymentApplication.type,
      paymentSubType: searchPayment.paymentApplication.paymentSubType,
      budgetPaymentSubtype: searchPayment.paymentApplication.budget.budgetPaymentSubtype,
      paymentMethod: searchPayment.paymentApplication.paymentMethod,
      amount: searchPayment.paymentApplication.amount,
      fee: searchPayment.paymentApplication.fee,
      ownFeeAmount: searchPayment.paymentApplication.ownFeeAmount,
      creditFeeAmount: searchPayment.paymentApplication.creditFeeAmount,
      bonusAmount: searchPayment.paymentApplication.bonus.bonusAmount,
      bonusRub: searchPayment.paymentApplication.bonus.bonusRub,
      loyaltyRate: searchPayment.paymentApplication.bonus.loyaltyRate,
      bonusTypeName: searchPayment.paymentApplication.bonus.bonusTypeName,
      bonusMaxPercent: searchPayment.paymentApplication.bonus.bonusMaxPercent,
      paymentId: searchPayment.paymentID,
      idPH: searchPayment.paymentApplication.ipt.idPH,
      linkedChequeId: searchPayment.paymentApplication.ipt.linkedChequeId,
      sourceSystem: searchPayment.sourceSystem,

      //источник
      docNumSender: senderPayDoc?.docNum ?? '',
      docIDSender: senderPayDoc?.docID ?? '',
      docStatusSender: senderPayDoc?.docStatus ?? '',
      accountSender: searchPayment.paymentApplication.payer.user.account,
      sbpMtelSender: searchPayment.paymentApplication.payer.user.sbpMtel,

      //приемник
      targetSystem: searchPayment.targetSystem,
      docNumReceiver: receiverPayDoc?.docNum ?? '',
      docIDReceiver: receiverPayDoc?.docID ?? '',
      docStatusReceiver: receiverPayDoc?.docStatus ?? '',
      accountReceiver: searchPayment.paymentApplication.payee.user.account,
      sbpMtelReceiver: searchPayment.paymentApplication.payee.user.sbpMtel,

      docNum: senderPayDoc?.docNum ?? '',
      docID: senderPayDoc?.docID ?? '',
      bankBIC: searchPayment.paymentApplication.payee.user.bankBIC,
      serviceName: searchPayment.paymentApplication.servicePayment.service.serviceName,
      operatorLegalName: searchPayment.paymentApplication.servicePayment.operator.operatorLegalName,
      iptID: searchPayment.paymentApplication.applicationChannel.iptID,
      cifID: searchPayment.paymentApplication.payer.user.cifID,
      applicationID: searchPayment.paymentApplication.applicationID,
      statusDescriptionPe: searchPayment.paymentApplication.statusDescriptionPe,
      parentType: searchPayment.paymentApplication.parentType,
      chequeNumber: searchPayment.paymentApplication.ipt.chequeNumber,
      linkedChequeNumber: searchPayment.paymentApplication.ipt.linkedChequeNumber,
      channelIP: searchPayment.paymentApplication.applicationChannel.channelIP,
      messageToReceiver: searchPayment.paymentApplication.messageToReceiver,
      sbpTransactionId: searchPayment.paymentApplication.sbp.sbpTransactionId,
      sbpWorkflowType: searchPayment.paymentApplication.sbp.sbpWorkflowType,
      sbpFraudScore: searchPayment.paymentApplication.sbp.sbpFraudScore,
      transactionStatus: searchPayment.paymentApplication.sbp.transactionStatus,
      settlementDate: searchPayment.paymentApplication.sbp.settlementDate,
    };
  });
}
