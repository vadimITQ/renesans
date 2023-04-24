import {IPayment, ISearchPayment} from "../../../../services/search-payment/types";

export type SearchPaymentWithManualParse = ISearchPayment & Pick<IPayment, 'manualParse'>
