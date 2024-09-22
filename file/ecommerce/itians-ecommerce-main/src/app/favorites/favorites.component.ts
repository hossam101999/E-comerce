import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteProducts: any[] = [];

  constructor(private authService: AuthService,private localStorageService:LocalStorageService) {}

  ngOnInit(): void {
    this.loadFavoriteProducts();
    this.localStorageService.getStorageChanges().subscribe(() => {
      this.loadFavoriteProducts();

    });
  }
  
  private loadFavoriteProducts(): void {
    const user = this.localStorageService.getItem<any>('user');
    if (user?.favourite) {
      this.favoriteProducts = user.favourite;
    }
  }

  private updateLocalStorage(favourites: any[]): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, favourite: favourites })
    );
  }
 
}


