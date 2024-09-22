import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailserService {
  private serviceID = 'service_d7gpbhj'; 
  private templateID = 'template_1kljqa7'; 
  private publicKey = 'TdpAl7R-CphAOIxi6';

  constructor() {
    emailjs.init(this.publicKey); 
  }

sendEmail(userEmail: string) {
  const templateParams = {
    to_email: userEmail, 
  };

  emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
    .then(response => {
      console.log('Email sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
}
}
