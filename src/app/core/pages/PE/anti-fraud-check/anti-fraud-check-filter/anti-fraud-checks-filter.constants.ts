
import { IMultiSelectData } from "../../../../../shared/components/controls/pe-multiselect/pe-multiselect.component";

export const antiFraudApplicationStatuses: IMultiSelectData[] = [
    {
        label: "Ожидает рассмотрения AntiFraud",
        value: "1"
    },
    {
        label: "На рассмотрении AntiFraud",
        value: "2"
    },
    {
        label: "Подтверждена AntiFraud",
        value: "3"
    },
    {
        label: "Отклонена AntiFraud",
        value: "5"
    }
];
