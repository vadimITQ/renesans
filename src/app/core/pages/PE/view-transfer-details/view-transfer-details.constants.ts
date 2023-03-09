import { TransferDetail } from './view-transfer-details.types';
import { IColumn } from '../search-payment/search-payment-table/search-payment-table.constants';

export const tableColumns: IColumn[] = [
  {
    header: 'Время',
    field: 'time',
  },
  {
    header: 'Код статуса',
    field: 'code',
  },
  {
    header: 'Статус РЕ',
    field: 'status',
  },
  {
    header: 'Детали',
    field: 'details',
  },
  {
    header: 'Тип ошибки',
    field: 'errorType',
  },
];

export const transferDetailDefaultValue: TransferDetail = {
  idPE: '',
  senderName: '',
  recipientName: '',
  recipientInn: '',
  aggregatorName: '',
  idPH: '',
  amount: '',
  creationDate: null,
  withdrawalAccount: '',
  recipientAccount: '',
  recipientBankBIC: '',
  beneficiaryName: '',
  appointment: '',
  transferHistory: [],
};
