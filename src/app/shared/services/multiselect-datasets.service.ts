import { Injectable } from '@angular/core';
import {
  receivingChanelOptions,
  objectTypeOptions,
} from '../../core/pages/PE/search-payment/search-payment-filters/search-payment-filters.constants';
import { IMultiSelectData } from '../components/controls/pe-multiselect/pe-multiselect.component';
import { manualChecksTransferTypes } from '../variables/manual-checks-transfer-types';
import { paymentStatuses } from '../variables/payment-status';
import { MultiselectDataSets } from '../enums/datasets.enums';
import { applicationStatusOptions } from '../../core/pages/PE/bank-ops-check/bank-ops-check-filters/bank-ops-check-filters.constants';

@Injectable({
  providedIn: 'root',
})
export class MultiselectDatasetsService {
  constructor() {}

  public getDataset(dataSetName: MultiselectDataSets): IMultiSelectData[] {
    switch (dataSetName) {
      case MultiselectDataSets.GetManualChecksTransferTypes: {
        if (this.validateDataset(manualChecksTransferTypes)) {
          return manualChecksTransferTypes;
        } else {
          return [];
        }
      }
      case MultiselectDataSets.GetObjectTypeOptions: {
        if (this.validateDataset(objectTypeOptions)) {
          return objectTypeOptions;
        } else {
          return [];
        }
      }
      case MultiselectDataSets.GetPaymentStatuses: {
        if (this.validateDataset(paymentStatuses)) {
          return paymentStatuses;
        } else {
          return [];
        }
      }
      case MultiselectDataSets.GetReceivingChanelOptions: {
        if (this.validateDataset(receivingChanelOptions)) {
          return receivingChanelOptions;
        } else {
          return [];
        }
      }
      case MultiselectDataSets.GetApplicationStatuses: {
        if (this.validateDataset(applicationStatusOptions)) {
          return applicationStatusOptions;
        } else {
          return [];
        }
      }
      case MultiselectDataSets.GetFileTypes: {
        return [
          {
            label: 'Файл',
            value: '*',
          },
          {
            label: 'pdf',
            value: '.pdf',
          },
          {
            label: 'Эксель файл',
            value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ];
      }
    }
  }

  public validateDataset(data: any[]): boolean {
    return data.every(item => {
      return item.label !== undefined && item.value !== undefined;
    });
  }

  public transformArrayToMultiselect(data: any[], labelProp: string, valueProp: string): IMultiSelectData[] {
    return data.map(x => {
      return {
        label: x[labelProp],
        value: x[valueProp],
      };
    });
  }
}
