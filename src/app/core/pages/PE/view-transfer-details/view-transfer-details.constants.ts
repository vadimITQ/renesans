import { IColumn } from '../../../../shared/types/table.types';

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

