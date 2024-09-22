import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDesginComponent } from './image-desgin.component';

describe('ImageDesginComponent', () => {
  let component: ImageDesginComponent;
  let fixture: ComponentFixture<ImageDesginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDesginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDesginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
