import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class ErrorhandlingService {
  error() {
    this.notifierService.notify('error', 'No response received');
  }
  constructor(private notifierService: NotifierService) { }
}
