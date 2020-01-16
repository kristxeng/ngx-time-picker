import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerPanelComponent } from './time-picker-panel.component';

describe('TimePickerPanelComponent', () => {
  let component: TimePickerPanelComponent;
  let fixture: ComponentFixture<TimePickerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
