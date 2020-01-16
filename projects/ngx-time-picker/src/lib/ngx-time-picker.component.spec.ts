import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTimePickerComponent } from './ngx-time-picker.component';

describe('NgxTimePickerComponent', () => {
  let component: NgxTimePickerComponent;
  let fixture: ComponentFixture<NgxTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
