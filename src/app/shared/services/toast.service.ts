import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccessToast(detail: string) {
    this.messageService.add({ severity: 'success', summary: 'Успешно', detail: detail });
  }

  showInfoToast(detail: string) {
    this.messageService.add({ severity: 'info', summary: 'Информация', detail: detail });
  }

  showWarnToast(detail: string) {
    this.messageService.add({ severity: 'warn', summary: 'Осторожно', detail: detail });
  }

  showErrorToast(detail: string) {
    this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: detail });
  }

  showCustomToast(detail: string) {
    this.messageService.add({ severity: 'custom', summary: '', detail: detail, icon: 'pi-file' });
  }

}
