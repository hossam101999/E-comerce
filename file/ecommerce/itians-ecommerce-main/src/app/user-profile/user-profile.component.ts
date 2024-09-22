import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { PasswordService } from '../password.service';
import { UserImageService } from '../user-image.service';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  originalAvatarSrc = 'assets/default-avatar.jpg';
  imageSrc = this.originalAvatarSrc;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private passwordService: PasswordService,
    private userImageService: UserImageService,
    private localStorageService:LocalStorageService
  ) {
    this.userProfileForm = this.fb.group({
      name: [''],
      email: [{ value: '', disabled: true }],
      image: [null],
      currentPassword: [{ value: '', disabled: true }],
      newPassword: [{ value: '', disabled: true }],
      confirmPassword: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userData = this.userService.getUserData();
    if (userData) {
      this.userProfileForm.patchValue(userData);
      this.imageSrc = userData.image || this.originalAvatarSrc;
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.userProfileForm.patchValue({ image: file });
        this.userImageService.setUserImage(this.imageSrc);
      };
      reader.readAsDataURL(file);
    }
  }

  enablePasswordFields(): void {
    this.editMode = true;
    this.userProfileForm.get('currentPassword')?.enable();
    this.userProfileForm.get('newPassword')?.enable();
    this.userProfileForm.get('confirmPassword')?.enable();
    this.userProfileForm.get('name')?.disable();
    this.userProfileForm.get('image')?.disable();
  }

  cancelChanges(): void {
    this.editMode = false;
    this.loadUserData();
    this.userProfileForm.get('currentPassword')?.disable();
    this.userProfileForm.get('newPassword')?.disable();
    this.userProfileForm.get('confirmPassword')?.disable();
    this.userProfileForm.get('name')?.enable();
    this.userProfileForm.get('image')?.enable();
  }

  saveChanges(): void {
    if (this.editMode) {
      this.updatePassword();
    } else {
      this.updateNameAndImage();
    }
  }

  updateNameAndImage(): void {
    const formData = new FormData();
    const formValues = this.userProfileForm.value;

    if (formValues.name) {
      formData.append('name', formValues.name);
    }
    if (formValues.image && formValues.image instanceof File) {
      formData.append('image', formValues.image, formValues.image.name);
    }

    this.userService.updateUserData(formData).subscribe({
      next: (response) => {
        this.localStorageService.setItem('user', response.user);
        this.showMessage('Profile updated successfully!');
      },
      error: (err) => {
        this.showMessage('Failed to save data', true);
      }
    });
  }

  updatePassword(): void {
    const { currentPassword, newPassword, confirmPassword } = this.userProfileForm.value;

    this.passwordService.changePassword(currentPassword, newPassword, confirmPassword).subscribe({
      next: (response) => {
        this.showMessage('Password changed successfully!');
      },
      error: (err) => {
        if (err.status === 500) {
          this.showMessage("Server error, please try again", true);
        } else if (err.status === 401) {
          this.showMessage("Incorrect current password", true);
        } else if (err.status === 400) {
          this.showMessage("Invalid data provided", true);
        } else {
          this.showMessage('Error changing password', true);
        }
      }
    });
  }

  showMessage(message: string, isError: boolean = false): void {
    Swal.fire({
      title: isError ? 'Error' : 'Success',
      text: message,
      icon: isError ? 'error' : 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: isError ? '#d9534f' : 'red'
    });
  }
}
