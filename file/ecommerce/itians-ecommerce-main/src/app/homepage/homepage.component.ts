import { Component } from '@angular/core';
import { CatogerysliderComponent } from '../catogeryslider/catogeryslider.component';
import { DesignimageComponent } from '../designimage/designimage.component';
import { FeaturesComponent } from '../features/features.component';
import { TrendingProductsComponent } from '../trending-products/trending-products.component';
import { EmailComponent } from '../email/email.component';
import { QuestionsComponent } from '../questions/questions.component';
import { SliderImageComponent } from '../slider-image/slider-image.component';
import { ImageDesginComponent } from '../image-desgin/image-desgin.component';
import 'hammerjs';
import { CarsouelComponent } from '../carsoul/carsoul.component';
import { MiniCashComponent } from '../mini-cash/mini-cash.component';
import { HeroComponent } from '../hero/hero.component';
import { WhatcustomersayComponent } from '../whatcustomersay/whatcustomersay.component';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CatogerysliderComponent,
    DesignimageComponent,
    FeaturesComponent,
    TrendingProductsComponent,
    EmailComponent,
    QuestionsComponent,
    SliderImageComponent,
    ImageDesginComponent,
    CarsouelComponent,
    MiniCashComponent,
    HeroComponent,
    WhatcustomersayComponent,
    IconsComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
