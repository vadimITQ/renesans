
export enum PaymentTypes {
    INT_SELF = "Перевод между своими счетами",
    INT_SELF24x7 = "Перевод между своими счетами, выведенный из под действия cut off time",
    EXT_BUDGET = "Платежи в бюджет ",
    EXT_LEGAL = "Внешний перевод в пользу юр. лица в рублях",
    EXT_NATURAL = "Внешний перевод в пользу другого физ. лица в рублях",
    EXT_SELF = "Перевод на свой счет в другом банке",
    SERVICE_PAYMENT = "Оплата услуг (интернет, мобильный телефон)",
    INT_NATURAL = "Перевод внутри банка другому клиенту",
    CONVERSION = "Перевод между своими счетами в разной валюте (Конвертация)",
    IPT_REPLENISH = "Пополнение через терминалы Банка",
    IPT_COMMISSION = "Оплата комиссионных продуктов",
    INT_LOYALTY = "Компенсация бонусными баллами",
    INT_LOYALTY_CONVERT = "Компенсация бонусными баллами без привязки к покупке",
    EXT_SBP = "Исходящий платеж через СБП",
    INC_SBP = "Входящий перевод через СБП",
    EXT_FSSP = "Внешний перевод ФССП",
    INC_MFO = "Перевод в счет погашения займа МКК (проект МФО)",
    EXT_SWIFT = "Исходящий SWIFT-перевод"
}

export enum PaymentStatus {
    LoadedOK = "(100) Расчитан PaymentId, платеж сохранен в базе",
    VerifyFAIL = "(150) Ошибка при валидации полей заявки",
    VerifyOK = "(160) Поля заявки провалидированы",
    CurrencyPositionFAIL = "(170) Ошибка при проверке статуса приема конверсионных заявок",
    CurrencyPositionOK = "(180) Статус приема конверсионных заявок проверен, заявка учтена в нетто-позиции",
    SourceSystemSetFAIL = "(200) Ошибка при определении системы-источника",
    SourceSystemSetOK = "(250) Определена система-источник",
    TargetSystemSetFAIL = "(300) Ошибка при определении системы-получателя",
    TargetSystemSetOK = "(350) Определена система-получатель",
    ClientReadFAIL = "(540) Ошибка при получении данных клиента из CIS",
    ClientReadOK = "(560) Получены и сохранены данные клиента из CIS",
    DbtPlanDateSetFAIL = "(565) Ошибка при расчете плановой даты",
    DbtPlanDateSetOK = "(570) Рассчитана и сохранена плановая дата",
    DbtPaymentPostponedDATEERR = "(575) Ошибка при проверке платежа на отложенность",
    DbtPaymentPostponedDATEOK = "(580) Выполнена проверка платежа на отложенность",
    DebAuthERR = "(700) Ошибка при авторизации дебета в АБС-источнике",
    DebAuthOK = "(800) Дебет авторизован, идентификаторы сохранены",
    EarlyCredAuthERR = "(801) Ошибка при 'ранней' авторизации кредита в АБС-получателе",
    EarlyCredAuthOK = "(802) 'Ранняя' авторизациия кредита выполнена, идентификаторы сохранены",
    CancelEarlyCredAuthERR = "(803) Ошибка при отмене 'ранней' авторизации кредита в АБС-получателе",
    CancelEarlyCredAuthOK = "(809) Отмена 'ранней' авторизации кредита в АБС-получателе выполнена успешно",
    AMLCheckERR = "(810) Отмена по итогам автопроверки AML",
    BankOpsCheckERR = "(830) Отмена по итогам автопроверки BankOps",
    AFSCheckERR = "(850) Отмена по итогам автопроверки AntiFraud",
    AutomaticChecksERR = "(855) Системная ошибка на этапе автоматических проверок",
    AutomaticChecksOK = "(860) Автоматические проверки пройдены",
    ManualChecks = "(870) Выполняются ручные проверки AML/AniFraud/BankOps",
    PaymentHubSendFail = "(804) Ошибка при обработке платежа в Payment Hub",
    PaymentHubPostponed = "(806) Платеж на обработке в Payment Hub",
    PaymentHubSentOK = "(808) Платеж обработан Payment Hub",
    PlanDateSetFAIL = "(400) Ошибка при расчете плановой даты",
    PlanDateSetOK = "(500) Рассчитана и сохранена плановая дата",
    PaymentPostponeDATEERR = "(900) Ошибка при проверке платежа на отложенность",
    PaymentPostponedOK = "(1000) Выполнена проверка платежа на отложенность",
    CredAuthERR = "(1100) Ошибка при авторизации кредита в АБС-получателе",
    CredAuthOK = "(1150) Кредит авторизован, идентификаторы сохранены",
    CredConfirmERR = "(1300) Ошибка подтверждения авторизации кредита в АБС-получателе",
    CancelCredAuthERR = "(1315) Ошибка при отмене авторизации кредита в АБС-получателе",
    CancelCredAuthOK = "(1320) Отмена авторизации кредита в АБС-получателе выполнена успешно",
    CancelDebAuthERR = "(1370) Ошибка при отмене авторизации дебета в АБС-источнике",
    CancelDebAuthOK = "(1380) Отмена авторизации дебета в АБС-источнике выполнена успешно",
    CancelCredConfirmOK = "(1385) Отмена подтверждения авторизации кредита выполнена успешно в АБС-получателе",
    CancelCredConfirmERR = "(1390) Ошибка при отмене подтверждения авторизации кредита в АБС-получателе",
    CredConfirmOK = "(1400) Авторизация кредита подтверждена в АБС-получателе",
    DebConfirmERR = "(1600) Ошибка подтверждения авторизации дебета в АБС-источнике",
    CancelDebConfirmERR = "(1690) Ошибка при отмене подтверждения авторизации дебета в АБС-получателе",
    CancelDebConfirmOK = "(1695) Oтмена подтверждения авторизации дебета в АБС-получателе выполнена успешно",
    DebConfirmOK = "(1700) Авторизация дебета подтверждена в АБС-источнике",
    DocAuthERR = "(1710) Ошибка при авторизации документа в АБС",
    DocAuthOK = "(1715) Документ авторизован для отправки в рейс",
    CancelDocAuthERR = "(1720) Ошибка при отмене авторизации документа для отправки в рейс",
    CancelDocAuthOK = "(1725) Отмена документа авторизации для отправки в рейс выполнена успешно",
    GLPostingERR = "(1900) Ошибка при формировании проводки в GL АБС D361",
    CancelGLPostingOK = "(2015) Отмена проводки в GL АБС D361 успешно выполнена.",
    GLCommissionPostingERR = "(2040) Ошибка при формировании проводки комиссии в GL АБС D361",
    CancelGLCommissionPostingERR = "(2070) Ошибка при отмене проводки комиссии в GL АБС D361",
    CancelGLCommissionPostingOK = "(2075) Отмена проводки комисси в GL АБС D361 вылнена успешно",
    GLNDSPostingERR = "(2100) Ошибка при формировании проводки НДС в GL АБС D361",
    GLNDSPostingOK = "(2120) Проводка НДС в GL АБС D361 успешно сформирована, идентификаторы сохранены",
    CancelGLNDSPostingERR = "(2140) Ошибка при отмене проводки НДС в GL АБС D361",
    CancelGLNDSPostingOK = "(2150) Отмена проводки НДС в GL АБС D361 вылнена успешно",
    AFSLimitUpdateОК = "(2800) Обновление лимита в AFS выполнено успешно",
    AFSLimitUpdateErr = "(2801) При обновлении лимита в AFS произошла ошибка",
    PaymentToCancel = "(1330) Платеж на отмену",
    PaymentToResume = "(2400) Платеж на возобновление обработки ('докатить')"
}