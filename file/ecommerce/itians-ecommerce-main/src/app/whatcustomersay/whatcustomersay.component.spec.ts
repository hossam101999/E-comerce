import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatcustomersayComponent } from './whatcustomersay.component';

describe('WhatcustomersayComponent', () => {
  let component: WhatcustomersayComponent;
  let fixture: ComponentFixture<WhatcustomersayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatcustomersayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatcustomersayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
