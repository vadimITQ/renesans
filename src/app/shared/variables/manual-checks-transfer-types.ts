import { PaymentStatus, PaymentTypes } from '../enums/manual-checks.enums';
import { IMultiCheckboxData } from '../components/controls/pe-multi-checkbox/pe-multi-checkbox.component';

export const manualChecksTransferTypes: IMultiCheckboxData[] = Object.entries(PaymentTypes).map(a => ({
  value: a[0],
  label: a[1],
}));

export const manualChecksStatuses: IMultiCheckboxData[] = Object.entries(PaymentStatus).map(a => ({ value: a[0], label: a[1] }));
