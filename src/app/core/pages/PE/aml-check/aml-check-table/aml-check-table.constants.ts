import {IColumn} from "../../../../../shared/types/table.types";

export const amlCheckTableColumns: IColumn[] = [
  {
    header: 'ID Заявки',
    field: 'applicationID',
  },
  {
    header: 'Дата заявки PE',
    field: 'pmtCreationTime',
  },
  {
    header: 'Статус AML',
    field: 'manualAMLCheckStatus',
  },
  {
    header: 'Статус AntiFraud',
    field: 'manualAntiFraudCheckStatus',
  },
  {
    header: 'Статус BankOps',
    field: 'manualBankOpsCheckStatus',
  },
  {
    header: 'Тип',
    field: 'type',
  },
  {
    header: 'Количество приложенных документов',
    field: 'numberOfDocuments',
  },
];
