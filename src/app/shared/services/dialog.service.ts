import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ConfirmationDialogModel } from '../models/confirmation-dialog-model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private confirmationService: ConfirmationService) {}

  showConfirmDialog(opts: ConfirmationDialogModel) {
    if (!opts) {
      return;
    }
    this.confirmationService.confirm({
      message: opts.message,
      header: opts.header,
      accept: opts.accept?.handler,
      reject: opts.reject?.handler,
      acceptLabel: opts.accept?.label,
      rejectLabel: opts.reject?.label,
    });
  }
}
