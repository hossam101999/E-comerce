import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showModal = true;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  email: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        resetToken: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('newPassword', 'confirmPassword'),
      }
    );

    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || null;
    });
  }

  get resetToken() {
    return this.resetPasswordForm.get('resetToken');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];

      if (
        confirmPassControl.errors &&
        !confirmPassControl.errors['mustMatch']
      ) {
        return;
      }

      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    const resetData = {
      token: this.resetPasswordForm.value.resetToken,
      email: this.email ?? '',
      newPassword: this.resetPasswordForm.value.newPassword,
      confirmPassword: this.resetPasswordForm.value.confirmPassword,
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage =
          'Your password has been successfully reset! You will be redirected to the login page in 4 minutes.';
        this.errorMessage = '';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 4000);
      },
      error: (error) => {
        this.isLoading = false;
        this.successMessage = '';
        if (error.error?.message.includes('Passwords do not match')) {
          this.errorMessage = 'Passwords do not match. Please try again.';
        } else if (error.error?.message.includes('User not found')) {
          this.errorMessage =
            'The token or email is incorrect. Please check and try again.';
        } else if (error.error?.message.includes('Token does not match')) {
          this.errorMessage = 'The token you entered does not match.';
        } else {
          this.errorMessage =
            'The token or email is incorrect. Please check and try again.';
        }
      },
    });
  }
}
