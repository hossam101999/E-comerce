import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage =
          'A reset code has been sent to your email. Please check your inbox.';
        this.errorMessage = null;


        setTimeout(() => {
          this.router.navigate(['/resetPassword'], {
            queryParams: { email: this.email?.value },
          });
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.successMessage = null;

        if (
          error.message.includes('This email does not exist in our records.')
        ) {
          this.errorMessage =
            'The email address does not exist in our records. Please check and try again.';
        } else if (error.message.includes('Bad request')) {
          this.errorMessage =
            'Bad request. Please ensure the email is correct.';
        } else {
          this.errorMessage = error.message;
        }
      },
    });
  }
}
