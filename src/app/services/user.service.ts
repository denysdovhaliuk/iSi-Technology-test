import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, username: 'admin', first_name: 'Admin', last_name: 'User', email: 'admin@example.com', password: 'admin1234', user_type: 'Admin' },
    { id: 2, username: 'driver', first_name: 'Driver', last_name: 'User', email: 'driver@example.com', password: 'driver1234', user_type: 'Driver' }
  ];

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  getUsers(): Observable<User[]> | Observable<never> {
    
    const isError = Math.random() < 0.3;

    if (isError) {
      const errorStatus = Math.random() < 0.5 ? 403 : 404;
      return throwError(() => new HttpErrorResponse({ status: errorStatus }));
    }
    
    return of(this.users);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 403) {
      return throwError(() => new Error('403 Forbidden'));
    } else if (error.status === 404) {
      return throwError(() => new Error('404 Not Found'));
    } else {
      return throwError(() => new Error('An unknown error occurred'));
    }
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  createUser(user: User): void {
    user.id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    this.users.push(user);
    this.saveToLocalStorage();
  }

  updateUser(id: number, user: User): void {
    const index = this.users.findIndex(u => u.id === id);
    
    if (index !== -1) {
      this.users[index] = {...user, id};
      
      this.saveToLocalStorage();
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
