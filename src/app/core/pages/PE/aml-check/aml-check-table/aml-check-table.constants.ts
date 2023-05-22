import {IColumn} from "../../../../../shared/types/table.types";

export const amlCheckTableColumns: IColumn[] = [
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
    field: 'statusAml',
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
  {
    header: 'Количество приложенных документов',
    field: 'docAmount',
  },
];
