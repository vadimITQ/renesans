import { IMultiCheckboxData } from '../../../../../shared/components/controls/pe-multi-checkbox/pe-multi-checkbox.component';

export const applicationStatusOptions: IMultiCheckboxData[] = [
  { label: 'Ожидает рассмотрения BankOps', value: '1' },
  { label: 'На рассмотрении BankOps', value: '2' },
  { label: 'Запрошены документы BankOps', value: '4' },
  { label: 'Подтверждена BankOps', value: '3' },
  { label: 'Отклонена BankOps', value: '5' },
  { label: 'Запрошены документы по SWIFT-платежам BankOps', value: '6' },
  { label: 'Приложены документы BankOps', value: '7' },
];
