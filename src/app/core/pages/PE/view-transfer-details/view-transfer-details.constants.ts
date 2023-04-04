import { IColumn } from '../search-payment/search-payment-table/search-payment-table.constants';
import {ITransferDetails} from "../../../services/view-transfer-details/types";

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

export const transferDetailDefaultValue: ITransferDetails = {
  amount: 0,
  appCreationTime: null,
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
