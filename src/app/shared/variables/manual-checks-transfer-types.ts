
import { PaymentStatus, PaymentTypes } from '../enums/manual-checks.enums';

export const manualChecksTransferTypes = Object.entries(PaymentTypes).map(a => ({ type: a[0], label: a[1] }));

export const manualChecksStatuses = Object.entries(PaymentStatus).map(a => ({ type: a[0], label: a[1] }));