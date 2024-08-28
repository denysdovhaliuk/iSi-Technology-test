import { Component, OnInit } from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-management';
  notification$: Observable<{ type: 'success' | 'error' | null, text: string }>;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.message$;
  }

  ngOnInit(): void {}
}
