import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputAccessorComponent } from './time-input-accessor.component';

describe('TimeInputAccessorComponent', () => {
  let component: TimeInputAccessorComponent;
  let fixture: ComponentFixture<TimeInputAccessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeInputAccessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
