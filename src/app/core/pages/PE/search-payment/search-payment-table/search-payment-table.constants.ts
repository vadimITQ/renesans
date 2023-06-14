import {IColumn} from "../../../../../shared/types/table.types";


export const searchPaymentTableColumns: IColumn[] = [
  // {
  //   header: 'ID PE',
  //   field: 'paymentId',
  // },
  {
    header: 'Дата  заявки',
    field: 'pmtCreationTime',
  },
  {
    header: 'Дата исполнения',
    field: 'plannedDate',
  },
  {
    header: 'Код статуса',
    field: 'statusCodePE',
  },
  {
    header: 'Статус',
    field: 'statusDescriptionPE',
  },
  {
    header: 'Тип перевода',
    field: 'type',
  },
  {
    header: 'Сумма',
    field: 'amount',
  },
  {
    header: 'Комиссии',
    field: 'fee',
  },
  {
    header: 'АБС источник',
    field: 'sourceSystem',
  },
  {
    header: 'Номер документа ДТ',
    field: 'docNum_D',
  },
  {
    header: 'Статус документа ДТ',
    field: 'docStatus_D',
  },
  {
    header: 'Счет ДТ',
    field: 'docID_D',
  },
  {
    header: 'АБС приемник',
    field: 'targetSystem',
  },
  {
    header: 'Номер документа КТ',
    field: 'docNum_C',
  },
  {
    header: 'Статус документа КТ',
    field: 'docStatus_C',
  },
  {
    header: 'Счет КТ',
    field: 'docID_C',
  },
  {
    header: 'CIF ID',
    field: 'cifID',
  },
  {
    header: 'ID заявки',
    field: 'applicationID',
  },
  {
    header: 'Идентификатор операции ОКПЦ СБП',
    field: 'referenceSbpTransactionId',
  },
  {
    header: 'Тип СБП платежа',
    field: 'sbpWorkflowType',
  },
  {
    header: 'ID PH',
    field: 'idPH',
  },
];
