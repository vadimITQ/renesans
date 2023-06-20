import { IColumn } from '../../../../../shared/types/table.types';

export const bankOpsCheckTableColumns: IColumn[] = [
  {
    header: 'ID Заявки',
    field: 'applicationId',
  },
  {
    header: 'Дата заявки в PE',
    field: 'appCreationTime',
  },
  {
    header: 'Статус AML',
    field: 'statusAML',
  },
  {
    header: 'Статус AntiFraud',
    field: 'statusAntiFraud',
  },
  {
    header: 'Статус BankOps',
    field: 'statusBankOps',
  },
  {
    header: 'Тип',
    field: 'type',
  },
];
