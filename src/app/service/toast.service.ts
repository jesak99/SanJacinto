import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../model/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: Toast[] = [];
  delay = 6000;

  subject = new BehaviorSubject<Toast[]|null>(null);
  toasts$ = this.subject.asObservable();

  add(toast: Toast) {
    this.toasts = [toast, ...this.toasts];
    this.subject.next(this.toasts);

    setTimeout(() => {
      this.toasts = this.toasts.filter(v => v !== toast);
      this.subject.next(this.toasts);
    }, this.delay);
  }

  remove(index: number) {
    this.toasts = this.toasts.filter((toast, i) => i !== index);
    this.subject.next(this.toasts);
  }
}
