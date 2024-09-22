import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforenavbarComponent } from './beforenavbar.component';

describe('BeforenavbarComponent', () => {
  let component: BeforenavbarComponent;
  let fixture: ComponentFixture<BeforenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeforenavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeforenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
