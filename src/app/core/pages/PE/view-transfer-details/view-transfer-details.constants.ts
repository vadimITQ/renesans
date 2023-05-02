import { IColumn } from '../search-payment/search-payment-table/search-payment-table.constants';
import {ITransferDetailsWithRetRefNumber} from "./view-transfer-details.types";

export const tableColumns: IColumn[] = [
  {
    header: 'Время',
    field: 'statusChangeTime',
  },
  {
    header: 'Код статуса',
    field: 'codeStatus',
  },
  {
    header: 'Статус РЕ',
    field: 'statusComment',
  },
  {
    header: 'Детали',
    field: 'description',
  },
  {
    header: 'Тип ошибки',
    field: 'errorType',
  },
];

export const transferDetailDefaultValue: ITransferDetailsWithRetRefNumber = {
  amount: 0,
  appCreationTime: null,
  retRefNumber: '',
  idPH: '',
  operatorLegalName: '',
  payeeAccount: '',
  payeeBankBIC: '',
  payeeInn: '',
  payeeName: '',
  payerAccount: '',
  payerName: '',
  paymentID: '',
  paymentPurpose: '',
  serviceName: '',
  statusHistory: [],
};
