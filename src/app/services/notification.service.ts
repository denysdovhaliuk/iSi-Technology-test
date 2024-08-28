import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new Subject<{ type: 'success' | 'error' | null, text: string }>();
  message$ = this.messageSource.asObservable();

  showMessage(type: 'success' | 'error', text: string) {
    this.messageSource.next({ type, text });
    
    setTimeout(() => {
      this.messageSource.next({type: null, text: ''});
    }, 1500)
  }
}
