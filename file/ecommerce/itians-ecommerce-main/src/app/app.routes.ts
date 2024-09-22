import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { ContactUSComponent } from './contact-us/contact-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { CartComponent } from './shoping-cart/cart/cart.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },

  { path: 'forgetPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },

  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'product',
    component: SearchComponent,
  },

  {
    path: 'favourite',
    component: FavoritesComponent,
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
  },

  {
    path: 'contact-us',
    component: ContactUSComponent,
  },

  {
    path: 'UserProfile',
    component: UserProfileComponent,
  },

  {
    path: 'Favourite',
    component: FavoritesComponent,
  },
  {
    path: 'details/:id',
    component: ProductdetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'complete',
    component: OrderCompleteComponent,
  },
  {
    path: 'cancel',
    component: CartComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,

  },
];

export { routes };
