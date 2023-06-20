import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccessToast(detail: string, header?: string) {
    this.messageService.add({ severity: 'success', summary: header ? header : 'Успешно', detail: detail });
  }

  showInfoToast(detail: string, header?: string) {
    this.messageService.add({ severity: 'info', summary: header ? header : 'Информация', detail: detail });
  }

  showWarnToast(detail: string, header?: string) {
    this.messageService.add({ severity: 'warn', summary: header ? header : 'Внимание', detail: detail });
  }

  showErrorToast(detail: string, header?: string) {
    this.messageService.add({ severity: 'error', summary: header ? header : 'Ошибка', detail: detail });
  }

  showCustomToast(detail: string, header?: string) {
    this.messageService.add({ severity: 'custom', summary: header ? header : '', detail: detail, icon: 'pi-file' });
  }
}
