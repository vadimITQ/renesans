import { IMultiCheckboxData } from '../../../../../shared/components/controls/pe-multi-checkbox/pe-multi-checkbox.component';

export const amlApplicationStatusOptions: IMultiCheckboxData[] = [
  { label: 'Ожидает рассмотрения AML', value: '1' },
  { label: 'На рассмотрении AML', value: '2' },
  { label: 'Запрошены документы AML', value: '4' },
  { label: 'Подтверждена AML', value: '3' },
  { label: 'Отклонена AML', value: '5' },
  { label: 'Ожидает рассмотрения AntiFraud', value: '1' },
  { label: 'На рассмотрении AntiFraud', value: '2' },
  { label: 'Подтверждена AntiFraud', value: '3' },
  { label: 'Отклонена AntiFraud', value: '5' },
  { label: 'Ожидает рассмотрения BankOps', value: '1' },
  { label: 'На рассмотрении BankOps', value: '2' },
  { label: 'Запрошены документы BankOps', value: '4' },
  { label: 'Подтверждена BankOps', value: '3' },
  { label: 'Отклонена BankOps', value: '5' },
  { label: 'Запрошены документы по SWIFT-платежам BankOps', value: '6' },
  { label: 'Приложены документы BankOps', value: '7' },
];
