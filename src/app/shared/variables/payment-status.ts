export const paymentStatusObj: any = {
  '100': 'Расчитан PaymentId, платеж сохранен в базе',
  '150': 'Ошибка при валидации полей заявки',
  '160': 'Поля заявки провалидированы',
  '170': 'Ошибка при проверке статуса приема конверсионных заявок',
  '180': 'Статус приема конверсионных заявок проверен, заявка учтена в нетто-позиции',
  '200': 'Ошибка при определении системы-источника',
  '250': 'Определена система-источник',
  '300': 'Ошибка при определении системы-получателя',
  '350': 'Определена система-получатель',
  '540': 'Ошибка при получении данных клиента из CIS',
  '560': 'Получены и сохранены данные клиента из CIS',
  '565': 'Ошибка при расчете плановой даты',
  '570': 'Рассчитана и сохранена плановая дата',
  '575': 'Ошибка при проверке платежа на отложенность',
  '580': 'Выполнена проверка платежа на отложенность',
  '590': 'Платеж отложен до завершения блокирующего платежа по счету',
  '700': 'Ошибка при авторизации дебета в АБС-источнике',
  '800': 'Дебет авторизован, идентификаторы сохранены',
  '801': "Ошибка при 'ранней' авторизации кредита в АБС-получателе",
  '802': "'Ранняя' авторизациия кредита выполнена, идентификаторы сохранены",
  '803': "Ошибка при отмене 'ранней' авторизации кредита в АБС-получателе",
  '807': "Ошибка при отправке платежа в СБП",
  '809': "Отмена 'ранней' авторизации кредита в АБС-получателе выполнена успешно",
  '810': 'Отмена по итогам автопроверки AML',
  '811': 'Платеж на обработке в СБП',
  '830': 'Отмена по итогам автопроверки BankOps',
  '850': 'Отмена по итогам автопроверки AntiFraud',
  '855': 'Системная ошибка на этапе автоматических проверок',
  '860': 'Автоматические проверки пройдены',
  '870': 'Выполняются ручные проверки AML/AniFraud/BankOps',
  '890': 'Проверки AML/AniFraud/BankOps пройдены',
  '804': 'Ошибка при обработке платежа в Payment Hub',
  '806': 'Платеж на обработке в Payment Hub',
  '808': 'Платеж обработан Payment Hub',
  '400': 'Ошибка при расчете плановой даты',
  '500': 'Рассчитана и сохранена плановая дата',
  '900': 'Ошибка при проверке платежа на отложенность',
  '1000': 'Выполнена проверка платежа на отложенность',
  '1030': 'Ошибка при проверке холда дебета',
  '1040': 'Проверка холда дебета выполнена успешно',
  '1100': 'Ошибка при авторизации кредита в АБС-получателе',
  '1150': 'Кредит авторизован, идентификаторы сохранены',
  '1300': 'Ошибка подтверждения авторизации кредита в АБС-получателе',
  '1315': 'Ошибка при отмене авторизации кредита в АБС-получателе',
  '1320': 'Отмена авторизации кредита в АБС-получателе выполнена успешно',
  '1370': 'Ошибка при отмене авторизации дебета в АБС-источнике',
  '1380': 'Отмена авторизации дебета в АБС-источнике выполнена успешно',
  '1385': 'Отмена подтверждения авторизации кредита выполнена успешно в АБС-получателе',
  '1390': 'Ошибка при отмене подтверждения авторизации кредита в АБС-получателе',
  '1400': 'Авторизация кредита подтверждена в АБС-получателе',
  '1500': 'Платеж отложен до завершения блокирующего платежа по счету',
  '1600': 'Ошибка подтверждения авторизации дебета в АБС-источнике',
  '1690': 'Ошибка при отмене подтверждения авторизации дебета в АБС-получателе',
  '1695': 'Oтмена подтверждения авторизации дебета в АБС-получателе выполнена успешно',
  '1700': 'Авторизация дебета подтверждена в АБС-источнике',
  '1710': 'Ошибка при авторизации документа в АБС',
  '1715': 'Документ авторизован для отправки в рейс',
  '1720': 'Ошибка при отмене авторизации документа для отправки в рейс',
  '1725': 'Отмена документа авторизации для отправки в рейс выполнена успешно',
  '1900': 'Ошибка при формировании проводки в GL АБС D361',
  '2000': 'Проводка в GL АБС D361 успешно сформирована, идентификаторы сохранены',
  '2010': 'Ошибка при отмене проводки комиссии в GL  АБС D361',
  '2015': 'Отмена проводки в GL АБС D361 успешно выполнена.',
  '2040': 'Ошибка при формировании проводки комиссии в GL АБС D361',
  '2070': 'Ошибка при отмене проводки комиссии в GL АБС D361',
  '2075': 'Отмена проводки комисси в GL АБС D361 вылнена успешно',
  '2100': 'Ошибка при формировании проводки НДС в GL АБС D361',
  '2120': 'Проводка НДС в GL АБС D361 успешно сформирована, идентификаторы сохранены',
  '2140': 'Ошибка при отмене проводки НДС в GL АБС D361',
  '2150': 'Отмена проводки НДС в GL АБС D361 вылнена успешно',
  '2800': 'Обновление лимита в AFS выполнено успешно',
  '2801': 'При обновлении лимита в AFS произошла ошибка',
  '1330': 'Платеж на отмену',
  '2400': "Платеж на возобновление обработки ('докатить')",
  '2500': 'Платеж/перевод успешно выполнен',
  '3000': 'Платёж отменён',
};

export const paymentStatuses: any = [
  { value: '100', label: '(100) Расчитан PaymentId, платеж сохранен в базе' },
  { value: '150', label: '(150) Ошибка при валидации полей заявки' },
  { value: '160', label: '(160) Поля заявки провалидированы' },
  { value: '170', label: '(170) Ошибка при проверке статуса приема конверсионных заявок' },
  { value: '180', label: '(180) Статус приема конверсионных заявок проверен, заявка учтена в нетто-позиции' },
  { value: '200', label: '(200) Ошибка при определении системы-источника' },
  { value: '250', label: '(250) Определена система-источник' },
  { value: '300', label: '(300) Ошибка при определении системы-получателя' },
  { value: '350', label: '(350) Определена система-получатель' },
  { value: '540', label: '(540) Ошибка при получении данных клиента из CIS' },
  { value: '560', label: '(560) Получены и сохранены данные клиента из CIS' },
  { value: '565', label: '(565) Ошибка при расчете плановой даты' },
  { value: '570', label: '(570) Рассчитана и сохранена плановая дата' },
  { value: '575', label: '(575) Ошибка при проверке платежа на отложенность' },
  { value: '580', label: '(580) Выполнена проверка платежа на отложенность' },
  { value: '590', label: '(590) Платеж отложен до завершения блокирующего платежа по счету' },
  { value: '700', label: '(700) Ошибка при авторизации дебета в АБС-источнике' },
  { value: '800', label: '(800) Дебет авторизован, идентификаторы сохранены' },
  { value: '801', label: "(801) Ошибка при 'ранней' авторизации кредита в АБС-получателе" },
  { value: '802', label: "(802) 'Ранняя' авторизациия кредита выполнена, идентификаторы сохранены" },
  { value: '803', label: "(803) Ошибка при отмене 'ранней' авторизации кредита в АБС-получателе" },
  { value: '809', label: "(809) Отмена 'ранней' авторизации кредита в АБС-получателе выполнена успешно" },
  { value: '810', label: '(810) Отмена по итогам автопроверки AML' },
  { value: '830', label: '(830) Отмена по итогам автопроверки BankOps' },
  { value: '850', label: '(850) Отмена по итогам автопроверки AntiFraud' },
  { value: '855', label: '(855) Системная ошибка на этапе автоматических проверок' },
  { value: '860', label: '(860) Автоматические проверки пройдены' },
  { value: '870', label: '(870) Выполняются ручные проверки AML/AniFraud/BankOps' },
  { value: '804', label: '(804) Ошибка при обработке платежа в Payment Hub' },
  { value: '806', label: '(806) Платеж на обработке в Payment Hub' },
  { value: '808', label: '(808) Платеж обработан Payment Hub' },
  { value: '400', label: '(400) Ошибка при расчете плановой даты' },
  { value: '500', label: '(500) Рассчитана и сохранена плановая дата' },
  { value: '900', label: '(900) Ошибка при проверке платежа на отложенность' },
  { value: '1000', label: '(1000) Выполнена проверка платежа на отложенность' },
  { value: '1030', label: '(1030) Ошибка при проверке холда дебета' },
  { value: '1040', label: '(1040) Проверка холда дебета выполнена успешно' },
  { value: '1100', label: '(1100) Ошибка при авторизации кредита в АБС-получателе' },
  { value: '1150', label: '(1150) Кредит авторизован, идентификаторы сохранены' },
  { value: '1300', label: '(1300) Ошибка подтверждения авторизации кредита в АБС-получателе' },
  { value: '1315', label: '(1315) Ошибка при отмене авторизации кредита в АБС-получателе' },
  { value: '1320', label: '(1320) Отмена авторизации кредита в АБС-получателе выполнена успешно' },
  { value: '1370', label: '(1370) Ошибка при отмене авторизации дебета в АБС-источнике' },
  { value: '1380', label: '(1380) Отмена авторизации дебета в АБС-источнике выполнена успешно' },
  { value: '1385', label: '(1385) Отмена подтверждения авторизации кредита выполнена успешно в АБС-получателе' },
  { value: '1390', label: '(1390) Ошибка при отмене подтверждения авторизации кредита в АБС-получателе' },
  { value: '1400', label: '(1400) Авторизация кредита подтверждена в АБС-получателе' },
  { value: '1500', label: '(1500) Платеж отложен до завершения блокирующего платежа по счету' },
  { value: '1600', label: '(1600) Ошибка подтверждения авторизации дебета в АБС-источнике' },
  { value: '1690', label: '(1690) Ошибка при отмене подтверждения авторизации дебета в АБС-получателе' },
  { value: '1695', label: '(1695) Oтмена подтверждения авторизации дебета в АБС-получателе выполнена успешно' },
  { value: '1700', label: '(1700) Авторизация дебета подтверждена в АБС-источнике' },
  { value: '1710', label: '(1710) Ошибка при авторизации документа в АБС' },
  { value: '1715', label: '(1715) Документ авторизован для отправки в рейс' },
  { value: '1720', label: '(1720) Ошибка при отмене авторизации документа для отправки в рейс' },
  { value: '1725', label: '(1725) Отмена документа авторизации для отправки в рейс выполнена успешно' },
  { value: '1900', label: '(1900) Ошибка при формировании проводки в GL АБС D361' },
  { value: '2000', label: '(2000) Проводка в GL АБС D361 успешно сформирована, идентификаторы сохранены' },
  { value: '2010', label: '(2010) Ошибка при отмене проводки комиссии в GL  АБС D361' },
  { value: '2015', label: '(2015) Отмена проводки в GL АБС D361 успешно выполнена.' },
  { value: '2040', label: '(2040) Ошибка при формировании проводки комиссии в GL АБС D361' },
  { value: '2070', label: '(2070) Ошибка при отмене проводки комиссии в GL АБС D361' },
  { value: '2075', label: '(2075) Отмена проводки комисси в GL АБС D361 вылнена успешно' },
  { value: '2100', label: '(2100) Ошибка при формировании проводки НДС в GL АБС D361' },
  { value: '2120', label: '(2120) Проводка НДС в GL АБС D361 успешно сформирована, идентификаторы сохранены' },
  { value: '2140', label: '(2140) Ошибка при отмене проводки НДС в GL АБС D361' },
  { value: '2150', label: '(2150) Отмена проводки НДС в GL АБС D361 вылнена успешно' },
  { value: '2800', label: '(2800) Обновление лимита в AFS выполнено успешно' },
  { value: '2801', label: '(2801) При обновлении лимита в AFS произошла ошибка' },
  { value: '1330', label: '(1330) Платеж на отмену' },
  { value: '2400', label: "(2400) Платеж на возобновление обработки ('докатить')" },
  { value: '2500', label: '(2500) Платеж/перевод успешно выполнен' },
  { value: '3000', label: '(3000) Платёж отменён' },
];
