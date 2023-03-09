import { TransferDetail } from './view-transfer-details.types';

export const transferDetailMock: TransferDetail = {
  idPE: 'test',
  senderName: 'test',
  recipientName: 'test',
  recipientInn: 'test',
  aggregatorName: 'test',
  idPH: 'test',
  amount: 'test',
  creationDate: '06/03/2023 12:30',
  withdrawalAccount: 'test',
  recipientAccount: 'test',
  recipientBankBIC: 'test',
  beneficiaryName: 'test',
  appointment: 'test',
  transferHistory: [
    {
      time: 'test',
      code: 'test',
      status: 'test',
      details: 'test',
      errorType: 'test',
    },
    {
      time: 'test1',
      code: 'test1',
      status: 'test1',
      details: 'test1',
      errorType: 'test1',
    },
  ],
};
