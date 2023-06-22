import {ITransferDetails} from "../../../services/view-transfer-details/types";

export interface ITransferDetailsWithRetRefNumber extends Omit<ITransferDetails, 'amount'> {
  amount: string;
  retRefNumber: string
}
