import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {
  private defaultAvatarSrc = 'assets/default-avatar.jpg';


  private userImageSubject = new BehaviorSubject<string>(this.getUserImage());
  userImage$ = this.userImageSubject.asObservable();

  constructor() {}

  getUserImage(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.image || this.defaultAvatarSrc;
  }

  setUserImage(imageSrc: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.image = imageSrc;
    localStorage.setItem('user', JSON.stringify(user));
    this.userImageSubject.next(imageSrc);
  }
}
