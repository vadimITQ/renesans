import { DatePipe } from '@angular/common';
import { DateHelper } from 'src/app/shared/classes/date-helper';
import { ISearchPaymentsResponse, PayDoc } from '../../../../services/search-payment/types';
import { ISearchPayment } from '../search-payment.types';
import {paymentStatusObj} from "../../../../../shared/variables/payment-status";

export function prepareSearchPaymentsData(data: ISearchPaymentsResponse[], datePipeRef?: DatePipe): ISearchPayment[] {
  return data.map(searchPayment => {
    const senderPayDoc = !!searchPayment.payDocs ? searchPayment.payDocs.filter(payDoc => searchPayment.sourceSystem === payDoc?.accountingSystem)[0]: null;
    const receiverPayDoc = !!searchPayment.payDocs ? searchPayment.payDocs.filter(payDoc => !!payDoc.accntDeb && !!payDoc.accntCre)[0]: null;
    const plannedDate = datePipeRef ? datePipeRef.transform(searchPayment.plannedDate, "dd-MM-yyyy") ?? "": searchPayment.plannedDate;
    const appCreationTime = datePipeRef ? datePipeRef.transform(searchPayment.paymentApplication?.appCreationTime, "dd-MM-yyyy HH:mm:ss") ?? "": searchPayment.paymentApplication?.appCreationTime;
    const settlementDate = datePipeRef ? datePipeRef.transform(searchPayment.paymentApplication?.sbp?.settlementDate, "dd-MM-yyyy") ?? "": searchPayment.paymentApplication?.sbp?.settlementDate;
    return {
      appCreationTime: appCreationTime,
      plannedDate: plannedDate,
      statusCode: searchPayment.paymentApplication?.statusCode,
      type: paymentStatusObj[searchPayment.statusCode],
      paymentSubType: searchPayment.paymentApplication?.paymentSubType,
      budgetPaymentSubtype: '', //searchPayment.paymentApplication?.budget?.budgetPaymentSubtype,
      paymentMethod: searchPayment.paymentApplication?.paymentMethod,
      amount: searchPayment.paymentApplication?.amount,
      fee: searchPayment.paymentApplication?.fee,
      ownFeeAmount: searchPayment.paymentApplication?.ownFeeAmount,
      creditFeeAmount: searchPayment.paymentApplication?.creditFeeAmount,
      bonusAmount: '', //searchPayment.paymentApplication?.bonus?.bonusAmount,
      bonusRub:  '', //searchPayment.paymentApplication?.bonus?.bonusRub,
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
      accountSender: searchPayment.paymentApplication?.payer?.user?.account,
      sbpMtelSender: searchPayment.paymentApplication?.payer?.user?.sbpMtel,

      //приемник
      targetSystem: searchPayment.targetSystem,
      docNumReceiver: receiverPayDoc?.docNum ?? '',
      docIDReceiver: receiverPayDoc?.docID ?? '',
      docStatusReceiver: receiverPayDoc?.docStatus ?? '',
      accountReceiver: searchPayment.paymentApplication?.payee?.user?.account,
      sbpMtelReceiver: searchPayment.paymentApplication?.payee?.user?.sbpMtel,

      docNum: senderPayDoc?.docNum ?? '',
      docID: senderPayDoc?.docID ?? '',
      bankBIC: searchPayment.paymentApplication?.payee?.user?.bankBIC,
      serviceName: '', //searchPayment.paymentApplication?.servicePayment?.service?.serviceName,
      operatorLegalName: '', //searchPayment.paymentApplication?.servicePayment?.operator?.operatorLegalName,
      iptID: '', //searchPayment.paymentApplication?.applicationChannel?.iptID,
      cifID: searchPayment.paymentApplication?.payer?.user?.cifID,
      applicationID: searchPayment.paymentApplication?.applicationID,
      statusDescriptionPe: searchPayment.paymentApplication?.statusDescriptionPe,
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

export function generateReport_prepareDataToExportXlsx(data: ISearchPaymentsResponse[] | null, datePipeRef?: DatePipe): { arrayData: any, heading: string[], fileName: string } {
  const result = {
    arrayData: null as any,
    heading: [] as string[],
    fileName: ""
  };
  if (data === null){
    return result;
  }
  result.heading.push(
    "ID PE",
    "Дата  заявки в PE",
    "Дата исполнения платежа",
    "Код статуса",
    "Тип перевода",
    "Подтип перевода\/платежа",
    "Подтип бюджетного перевода",
    "Способ перевода",
    "Сумма",
    "Комиcсия",
    "Комиcсия (собств.)",
    "Комиcсия (кред.)",
    "Количество использованных бонусов для оплаты",
    "Сумма, оплаченная бонусами",
    "Курс конвертации бонусов",
    "ID PH",
    "ID чека",
    "ABS Источник",
    "Номер документа - ABS Источник",
    "ID ABS Источник",
    "Статус документа в ABS Источник",
    "Номер счета ABS Источник",
    "ABS Приемник",
    "Номер документа - ABS Приемник",
    "ID ABS Приемник",
    "Статус документа в ABS Приемник",
    "Номер счета ABS Приемник",
    "Номер документа GL",
    "ID GL",
    "Статус GL",
    "Счет по дебету GL",
    "Счет по кредиту GL",
    "БИК Банка-получателя",
    "Наименование бенефициара",
    "Наименование агрегатора",
    "ID терминала",
    "CIFID",
    "ID Заявки",
    "Статус ИБ",
    "Статус PE",
    "Подтип заявки",
    "Тип заявки",
    "Периодичность",
    "IP адрес",
    "Данные о браузере пользователя"
  );
  const exportDate = new Date();
  const [day, month, year] = DateHelper.convertDateSegmentToValidLength(exportDate.getDate(), exportDate.getMonth() + 1, exportDate.getFullYear());
  result.fileName = "searchPayment_" + `${day}${month}${year}`;

  result.arrayData = data.map(x => {
    const payDocSource: PayDoc | null = !!x?.payDocs ? x.payDocs.filter(payDoc => x?.sourceSystem === payDoc?.accountingSystem)[0] : null;
    const payDocTarget: PayDoc | null = !!x?.payDocs ? x.payDocs.filter(payDoc => !!payDoc.accntDeb && !!payDoc.accntCre)[0] : null;
    const statusCodeNum: number = +x?.paymentApplication?.statusCode;
    const statusGl: string = ((statusCodeNum >= 1705 && statusCodeNum <= 2150) || ([3000].includes(statusCodeNum)))
      ? x?.paymentApplication?.statusPE
      : statusCodeNum === 2500
      ? "OK"
      : "";

    const appCreationTime = datePipeRef ? datePipeRef.transform(x?.paymentApplication?.appCreationTime, "dd-MM-yyyy HH:mm:ss") ?? "": x?.paymentApplication?.appCreationTime;
    const plannedDate = datePipeRef ? datePipeRef.transform(x?.plannedDate, "dd-MM-yyyy") ?? "": x?.plannedDate;

    return {
      paymentId: x?.paymentID,
      appCreationTime: appCreationTime,
      plannedDate: plannedDate,
      statusCodePe: x?.paymentApplication?.statusCodePE,
      type: paymentStatusObj[x?.statusCode],
      paymentSubType: x?.paymentApplication?.paymentSubType,
      budgetPaymentSubtype: x?.paymentApplication?.budget?.budgetPaymentSubtype,
      paymentMethod: x?.paymentApplication?.paymentMethod,
      amount: x?.paymentApplication?.amount,
      fee: x?.paymentApplication?.fee,
      ownFeeAmount: x?.paymentApplication?.ownFeeAmount,
      creditFeeAmount: x?.paymentApplication?.creditFeeAmount,
      bonusAmount: x?.paymentApplication?.bonus?.bonusAmount,
      bonusRub: x?.paymentApplication?.bonus?.bonusRub,
      loyaltyRate: x?.paymentApplication?.bonus?.loyaltyRate,
      idPH: x?.paymentApplication?.ipt?.idPH,
      linkedChequeId: x?.paymentApplication?.ipt?.linkedChequeId,
      sourceSystem: x?.sourceSystem,
      docNumSource: payDocSource?.docNum,
      docIDSource: payDocSource?.docID,
      docStatusSource: payDocSource?.docStatus,
      accntCreSource: payDocSource?.accntCre,
      targetSystem: x?.targetSystem,
      docNumTarget: payDocTarget?.docNum,
      docIDTarget: payDocTarget?.docID,
      docStatusTarget: payDocTarget?.docStatus,
      accntDebTarget: payDocTarget?.accntDeb,
      NumGl: "",
      IdGl: "",
      statusGl: statusGl,
      debetGl: "",
      creditGl: "",
      bankBIC: x?.paymentApplication?.payer?.user?.bankBIC,
      benefName: "",
      operatorLegalName: x?.paymentApplication?.servicePayment?.operator?.operatorLegalName,
      iptID: x?.paymentApplication?.applicationChannel?.iptID,
      cifID: x?.paymentApplication?.payer?.user?.cifID,
      applicationID: x?.paymentApplication?.applicationID,
      statusIb: "",
      statusDescriptionPe: x?.paymentApplication?.statusDescriptionPe,
      parentType: x?.paymentApplication?.parentType,
      typeApplication: "Платеж\перевод",
      once: "Разовый",
      channelIP: x?.paymentApplication?.applicationChannel?.channelIP,
      browserData: "",
    }
  });
  return result;
}
