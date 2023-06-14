
import { FormControl } from "@angular/forms";

export interface AntiFraudDetailsForm {
    IdPE: FormControl<string | null>;
    paymentDatePE: FormControl<string | null>;
    fioPayer: FormControl<string | null>;
    writeOffAccount: FormControl<string | null>;
    recipientFio: FormControl<string | null>;
    recipientAccount: FormControl<string | null>;
    recipientINN: FormControl<string | null>;
    recipientBankBIK: FormControl<string | null>;
    appointment: FormControl<string | null>;
    transferAmount: FormControl<string | null>;
    ip: FormControl<string | null>;
    userAgent: FormControl<string | null>;
}

export interface AntiFraudDetails {
    IdPE: string | null;
    paymentDatePE: string | null;
    fioPayer: string | null;
    writeOffAccount: string | null;
    recipientFio: string | null;
    recipientAccount: string | null;
    recipientINN: string | null;
    recipientBankBIK: string | null;
    appointment: string | null;
    transferAmount: string | null;
    ip: string | null;
    userAgent: string | null;
}