import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogerysliderComponent } from './catogeryslider.component';

describe('CatogerysliderComponent', () => {
  let component: CatogerysliderComponent;
  let fixture: ComponentFixture<CatogerysliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatogerysliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatogerysliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
