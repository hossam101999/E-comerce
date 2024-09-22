import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {EmailserService } from '../../service/emailser.service';
@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent {
  userEmail: string = '';
  constructor(private emailService: EmailserService) {}

  sendEmail() {
    if (this.userEmail) {
      this.emailService.sendEmail(this.userEmail);
      this.userEmail = '';
    } else {
      console.error('All fields are required.');
    }
  }
}
