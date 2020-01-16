import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TIME_STRING } from '../injection-tokens';
import { TimePickerPanelCtrlRef } from '../time-picker-panel-ctrl-ref';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'time-picker-panel',
  templateUrl: './time-picker-panel.component.html',
  styleUrls: ['./time-picker-panel.component.scss']
})
export class TimePickerPanelComponent implements OnInit {
  form: FormGroup;

  constructor(
    public el: ElementRef,
    private fb: FormBuilder,
    private ctrlRef: TimePickerPanelCtrlRef,
    @Inject(TIME_STRING) private timeString,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.setInitTime(this.timeString);
  }

  buildForm() {
    this.form = this.fb.group({
      hour: [null],
      minute: [null],
      second: [null],
    });
  }

  setInitTime(timeString) {
    const formatInputValue = this.getFormatedInputValue(timeString);
    this.form.setValue( formatInputValue );
  }

  getFormatedInputValue(timeString: string) {
    const timeArray = timeString.split(':');
    return ({
      hour: timeArray[0],
      minute: timeArray[1],
      second: timeArray[2],
    });
  }

  getFormatedOutputValue(timeObj) {
    return `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`;
  }

  submit() {
    const formatedOuptutValue = this.getFormatedOutputValue(this.form.value);
    this.ctrlRef.close( formatedOuptutValue );
  }

  cancel() {
    this.ctrlRef.close();
  }
}
