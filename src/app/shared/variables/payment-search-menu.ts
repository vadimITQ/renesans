import { RouterPath } from '../enums/router.enums';
import { PaymentEngineMenuLink } from '../models/payment-engine-menu';

export const paymentEngineLinks: PaymentEngineMenuLink[] = [
  {
    name: 'Поиск платежей',
    navigation: RouterPath.SearchPayment,
    clicked: false,
  },
  {
    name: 'Ручной разбор ошибочных переводов и платежей',
    navigation: RouterPath.ManualChecks,
    clicked: false,
  },
  {
    name: 'BankOps проверка',
    navigation: RouterPath.BankOpsCheck,
    clicked: false,
  },
  {
    name: 'AML проверка',
    navigation: RouterPath.AmlCheck,
    clicked: false,
  },

  // {
  //   name: 'Заявки PE',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Заявки WPS',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Погашение с дебетовых карт',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'AML проверка',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Antifraud проверка',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Bankops проверка',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Платёжная позиция',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Загрузка и просмотр курсов валют',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'AML проверка заявов на длительные поручения',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Antifraud проверка заявок на длительные поручения',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Bankops проверка заявок на длительные поручения',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Мониторинг длительных поручений',
  //   navigation: RouterPath.MonitoringStandingOrders,
  //   clicked: false,
  // },
  // {
  //   name: 'Заявки по длительным поручениям',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // },
  // {
  //   name: 'Список длительных поручений',
  //   navigation: RouterPath.Test,
  //   clicked: false,
  // }
];
