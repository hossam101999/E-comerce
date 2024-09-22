import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCashComponent } from './mini-cash.component';

describe('MiniCashComponent', () => {
  let component: MiniCashComponent;
  let fixture: ComponentFixture<MiniCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
