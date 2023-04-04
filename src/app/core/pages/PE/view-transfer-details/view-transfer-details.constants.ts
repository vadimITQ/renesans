import { IColumn } from '../search-payment/search-payment-table/search-payment-table.constants';
import {ITransferDetails} from "../../../services/view-transfer-details/types";

export const tableColumns: IColumn[] = [
  {
    header: 'Время',
    field: 'appCreationTime',
  },
  {
    header: 'Код статуса',
    field: 'statusCode',
  },
  {
    header: 'Статус РЕ',
    field: 'status',
  },
  {
    header: 'Детали',
    field: '',
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
