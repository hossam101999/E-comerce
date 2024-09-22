import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userImage: string = '';
  searchActive = false;
  navbarVisible = false;
  searchTerm: string = '';
  isAuthenticated: boolean = false;
  totalCartItems:number=0

  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.updateCartItemCount();
    this.updateUserImage();
    this.localStorageService.getStorageChanges().subscribe(() => {
      this.updateUserImage();
      this.updateCartItemCount();
    });

    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });

    this.router.events.subscribe(() => {
      this.searchActive = false;
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const searchContainer = document.querySelector('.search-container');
    if (this.searchActive && searchContainer && !searchContainer.contains(event.target as Node)) {
      this.closeSearch();
    }
  }

  toggleSearch() {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      this.navbarVisible = false;
    }
  }

  closeSearch() {
    this.searchActive = false;
  }

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
  }

  performSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchTerm },
      });
      this.searchActive = false;
      this.searchTerm = '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private updateCartItemCount() {
    const cart = this.localStorageService.getItem<any[]>('cart') || [];
    this.totalCartItems = cart.length;
  }

  private updateUserImage() {
    const user = this.localStorageService.getItem<any>('user');
    if (user && user.image) {
      this.userImage = user.image;
    } else {
      this.userImage = 'path-to-default-image';
    }
  }
}
