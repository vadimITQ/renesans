import {IColumn} from "../../../../../shared/types/table.types";


export const searchPaymentTableColumns: IColumn[] = [
  // {
  //   header: 'ID PE',
  //   field: 'paymentId',
  // },
  {
    header: 'Дата  заявки в PE',
    field: 'appCreationTime',
  },
  {
    header: 'Дата исполнения платежа',
    field: 'plannedDate',
  },
  {
    header: 'Код статуса',
    field: 'statusCode',
  },
  {
    header: 'Тип перевода',
    field: 'type',
  },
  {
    header: 'Подтип перевода/платежа',
    field: 'paymentSubType',
  },
  {
    header: 'Подтип бюджетного перевода',
    field: 'budgetPaymentSubtype',
  },
  {
    header: 'Способ перевода',
    field: 'paymentMethod',
  },
  {
    header: 'Сумма',
    field: 'amount',
  },
  {
    header: 'Комиcсия',
    field: 'fee',
  },
  {
    header: 'Комиcсия (собств.)',
    field: 'ownFeeAmount',
  },
  {
    header: 'Комиcсия (кред.)',
    field: 'creditFeeAmount',
  },
  {
    header: 'Количество использованных бонусов для оплаты',
    field: 'bonusAmount',
  },
  {
    header: 'Сумма, оплаченная бонусами',
    field: 'bonusRub',
  },
  {
    header: 'Курс конвертации бонусов',
    field: 'loyaltyRate',
  },
  {
    header: 'Наименование типа компенсации бонусами',
    field: 'bonusTypeName',
  },
  {
    header: 'Максимальный процент суммы оплаты бонусами',
    field: 'bonusMaxPercent',
  },
  {
    header: 'ID PH',
    field: 'idPH',
  },
  {
    header: 'ID чека',
    field: 'linkedChequeId',
  },
  {
    header: 'ABS источник',
    field: 'sourceSystem',
  },
  {
    header: 'Номер документа - ABS источник',
    field: 'docNumSender',
  },
  {
    header: 'ID ABS Источник',
    field: 'docIDSender',
  },
  {
    header: 'Статус документа в ABS источник',
    field: 'docStatusSender',
  },
  {
    header: 'Номер счета ABS Источник',
    field: 'accountSender',
  },
  {
    header: 'Номер телефона отправителя в формате 0079101234567',
    field: 'sbpMtelSender',
  },
  {
    header: 'ABS Приемник',
    field: 'targetSystem',
  },
  {
    header: 'Номер документа - ABS Приемник',
    field: 'docNumReceiver',
  },
  {
    header: 'ID ABS Приемник',
    field: 'docIDReceiver',
  },
  {
    header: 'Статус документа в ABS приемник',
    field: 'docStatusReceiver',
  },
  {
    header: 'Номер счета ABS Приемник',
    field: 'accountReceiver',
  },
  {
    header: 'Номер телефона получателя в формате 0079101234567',
    field: 'sbpMtelReceiver',
  },
  {
    header: 'Номер документа GL',
    field: 'docNum',
  },
  {
    header: 'ID GL',
    field: 'docID',
  },
  // todo: update me
  {
    header: 'Статус GL',
    field: '',
  },
  {
    header: 'Счет по дебету GL',
    field: '',
  },
  {
    header: 'Счет по кредиту GL',
    field: '',
  },
  //
  {
    header: 'БИК банка- получателя',
    field: 'bankBIC',
  },
  {
    header: 'Наименование бенефициара',
    field: 'serviceName',
  },
  {
    header: 'Наименование агрегатора',
    field: 'operatorLegalName',
  },
  {
    header: 'ID терминала',
    field: 'iptID',
  },
  {
    header: 'CIFID',
    field: 'cifID',
  },
  {
    header: 'ID Заявки',
    field: 'applicationID',
  },
  {
    header: 'Статус PE',
    field: 'statusDescriptionPe',
  },
  {
    header: 'Подтип заявки',
    field: 'parentType',
  },
  {
    header: 'Номер чека',
    field: 'chequeNumber',
  },
  {
    header: 'Номер связанного чека',
    field: 'linkedChequeNumber',
  },
  {
    header: 'Идентификатор связанного чека',
    field: 'linkedChequeId',
  },
  {
    header: 'IP адрес',
    field: 'channelIP',
  },
  // todo: update me
  {
    header: 'Данные о браузере пользователя',
    field: '',
  },
  {
    header: 'Сообщение получателю',
    field: 'messageToReceiver',
  },
  {
    header: 'Идентификатор Операции ОПКЦ СБП',
    field: 'sbpTransactionId',
  },
  {
    header: 'Тип СБП-платежа',
    field: 'sbpWorkflowType',
  },
  {
    header: 'Результат фродскоринга',
    field: 'sbpFraudScore',
  },
  {
    header: 'Статус обращения в СБП',
    field: 'transactionStatus',
  },
  {
    header: 'Дата проведения расчетов',
    field: 'settlementDate',
  },
];
