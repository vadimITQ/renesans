import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { GetPaymentsResponse } from 'src/app/shared/models/manual-checks-models';
import { manualChecksTableData } from 'src/app/shared/mocks/manual-checks-table.mock';
import { ISearchPaymentTableData } from '../../pages/PE/search-payment/search-payment.types';
import { API_URL } from '../../../shared/variables/http-constants';
import { ITransferDetails } from '../view-transfer-details/types';
import { IGetSearchPaymentsReportPayload, ISearchPaymentsFiltersPayload, ISearchPaymentsResponse } from '../search-payment/types';
import { ICancelPaymentPayload, ICancelPaymentResponse, IGetManualCheckModePayload, IGetManualCheckModeResponse, IResumePaymentPayload, IResumePaymentResponse, ISaveManualCheckModePayload, ISaveManualCheckModeResponse } from './types';
import { Pagination } from '../../../shared/services/table.service';
import {prepareFiltersToQuery, } from "../../../shared/utils/object";
import {GetApplicationsListCheckType} from "../../../shared/enums/get-applications-list.enums";
import {
  IGetApplicationsListPayload,
  IGetApplicationListResponse,
} from "../../../shared/types/get-applications-list";
import {IApplicationDetails} from "../../../shared/types/get-application-details";
import { ObjectHelper } from 'src/app/shared/classes/object-helper';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderWService {
  constructor(private http: HttpClient) {}

  public cancelPayment(cancelPaymentPayload: ICancelPaymentPayload): Observable<ICancelPaymentResponse> {
    return this.http.post<ICancelPaymentResponse>(API_URL + '/cancelPayment', cancelPaymentPayload);
  }

  public resumePayment(resumePaymentBody: IResumePaymentPayload): Observable<any> {
    return this.http.post<IResumePaymentResponse>(API_URL + '/resumePayment', {}, { params: { ...resumePaymentBody } });
  }

  public getPayments(form: 'ManualChecks'): Observable<GetPaymentsResponse[] | ISearchPaymentTableData[]> {
    const mockData = manualChecksTableData;
    if (mockData) {
      // return this.http.get(API_URL + '/searchPayments'); //of(mockData).pipe(delay(2000));
      return of(mockData).pipe(delay(2000));
    } else {
      return of([]);
    }
  }

  public getSearchPayments(filters: ISearchPaymentsFiltersPayload, pagination: Pagination): Observable<ISearchPaymentsResponse> {
    return this.http.post<ISearchPaymentsResponse>(API_URL + '/searchPayments', filters, { params: { ...pagination } });
  }

  public getSearchPaymentsManual(filters: ISearchPaymentsFiltersPayload, pagination: Pagination): Observable<ISearchPaymentsResponse> {
    return this.http.post<ISearchPaymentsResponse>(API_URL + '/searchPayments', filters, {
      params: { ...pagination, isManualParse: true },
    });
  }

  public getTransferDetails(paymentID: string): Observable<ITransferDetails> {
    return this.http.get<ITransferDetails>(API_URL + '/searchPaymentDetails', {
      params: { paymentID },
    });
  }

  public getPaymentsReport(payload: IGetSearchPaymentsReportPayload): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(API_URL + '/paymentsReport', payload.searchPayments , {
      params: ObjectHelper.deleteUndefinedProperties({
        isManualParse: payload.isManualParse ?? undefined,
        isSBPReport: payload.isSBPReport ?? undefined
      }),
      responseType: 'arraybuffer' as 'json',
    });
  }

  public getApplicationsList(filters: IGetApplicationsListPayload, pagination: Pagination, checkType: GetApplicationsListCheckType): Observable<IGetApplicationListResponse> {
    return this.http.get<IGetApplicationListResponse>(API_URL + '/getApplicationsList',{
      params: { ...pagination, ...prepareFiltersToQuery(filters), checkType },
    });
  }

  public getManualCheckMode(payload: IGetManualCheckModePayload): Observable<IGetManualCheckModeResponse> {
    return this.http.get<IGetManualCheckModeResponse>(API_URL + '/getManualCheckMode',
      {
        params: { ...payload }
      }
    );
  }

  public saveManualCheckMode(payload: ISaveManualCheckModePayload): Observable<ISaveManualCheckModeResponse> {
    return this.http.post<ISaveManualCheckModeResponse>(API_URL + '/saveManualCheckMode', payload.manualCheck, {
      params: {
        paymentID: payload.paymentID
      }
    });
  }

  public getApplicationDetails(applicationID: string): Observable<IApplicationDetails> {
    return this.http.get<IApplicationDetails>(API_URL + `/getApplicationDetails/${applicationID}`);
  }
}
