import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: number | null = null;
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      ]],
      user_type: ['', Validators.required],
    });
  }

  private checkEditMode(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEditMode = true;
      this.loadUserData(this.userId);
    }
  }

  private loadUserData(userId: number): void {
    const user: User | undefined = this.userService.getUserById(userId);
    if (user) {
      this.userForm.patchValue(user);
      this.userName = `${this.userForm.get('first_name')?.value} ${this.userForm.get('last_name')?.value}`;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEditMode && this.userId !== null) {
        this.userService.updateUser(this.userId, user);
        this.notificationService.showMessage('success', 'User updated successfully.');
      } else {
        this.userService.createUser(user);
        this.notificationService.showMessage('success', 'User created successfully.');
      }
      this.router.navigate(['/users']);
    } else {
      this.notificationService.showMessage('error', 'Please fill out the form correctly.');
    }
  }

  onDelete(): void {
    if (this.userId !== null) {
      this.userService.deleteUser(this.userId);
      this.notificationService.showMessage('success', 'User deleted successfully.');
      this.router.navigate(['/users']);
    }
  }
}
