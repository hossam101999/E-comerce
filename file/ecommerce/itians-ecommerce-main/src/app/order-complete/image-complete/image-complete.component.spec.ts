import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCompleteComponent } from './image-complete.component';

describe('ImageCompleteComponent', () => {
  let component: ImageCompleteComponent;
  let fixture: ComponentFixture<ImageCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
