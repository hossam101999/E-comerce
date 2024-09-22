import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoaderComponent } from './loader/loader.component';
import { BeforenavbarComponent } from './beforenavbar/beforenavbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    HttpClientModule,
    RouterOutlet,
    SearchComponent,
    OrderCompleteComponent,
    FavoritesComponent,
    LoaderComponent,
    BeforenavbarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
}
