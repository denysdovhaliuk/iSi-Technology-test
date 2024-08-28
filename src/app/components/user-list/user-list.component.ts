import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscription!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getUsers(): void {
    this.subscription = this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error: any) => {
        this.handleError(error);
      }
    });
  }

  private handleError(error: any): void {
    if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      if (error.message.includes('403')) {
        this.router.navigate(['/403']);
      } else if (error.message.includes('404')) {
        this.router.navigate(['/404']);
      } else {
        console.error('An error occurred:', error);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

  onCreate(): void {
    this.router.navigate(['/user/create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/user/edit', id]);
  }

  onRowClick(id: number): void {
    this.onEdit(id);
  }
}
