
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export const antiFraudApplicationStatuses: IMultiSelectData[] = [
    {
        label: "Ожидает рассмотрения AntiFraud (значение по умолчанию)",
        value: "Ожидает рассмотрения AntiFraud (значение по умолчанию)"
    },
    {
        label: "На рассмотрении AntiFraud",
        value: "На рассмотрении AntiFraud"
    },
    {
        label: "Запрошены документы AntiFraud",
        value: "Запрошены документы AntiFraud"
    },
    {
        label: "Подтверждена AntiFraud",
        value: "Подтверждена AntiFraud"
    },
    {
        label: "Отклонена AntiFraud",
        value: "Отклонена AntiFraud"
    }
];