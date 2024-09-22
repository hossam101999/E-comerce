import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarselComponent } from './carsel.component';

describe('CarselComponent', () => {
  let component: CarselComponent;
  let fixture: ComponentFixture<CarselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
