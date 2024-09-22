import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignimageComponent } from './designimage.component';

describe('DesignimageComponent', () => {
  let component: DesignimageComponent;
  let fixture: ComponentFixture<DesignimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignimageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
