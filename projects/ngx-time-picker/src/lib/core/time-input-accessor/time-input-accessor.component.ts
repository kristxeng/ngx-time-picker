import { Component, OnInit, ViewChild, Input, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'time-input-accessor',
  templateUrl: './time-input-accessor.component.html',
  styleUrls: ['./time-input-accessor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeInputAccessorComponent),
    multi: true,
  }]
})
export class TimeInputAccessorComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', { static: true }) input;
  @Input() max: number;
  @Input() min: number;

  private onChange: (_) => void;
  private onTouched: () => void;
  public isDisabled: boolean;

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
  }

  onInputChange(value) {
    let formatedValue;
    if ( Number.isNaN(value) ) {
      formatedValue = 0;

    } else {
      formatedValue = this.zeroPadding( this.cycleValue( +value ) );
    }
    this.changeModelAndViewValue( formatedValue );
  }

  cycleValue(value) {
    const baseValue = this.max + 1;
    if ( value < this.min ) {
      return value % baseValue + baseValue;
    }
    if ( value > this.max ) {
      return value % baseValue;
    }
    return value;
  }

  onArrowUp(e) {
    e.preventDefault();
    let value = +e.target.value;
    if ( value === this.max ) {
      value = this.min;
    } else {
      value++;
    }
    this.changeModelAndViewValue( this.zeroPadding(value) );
  }

  onArrowDown(e) {
    e.preventDefault();
    let value = +e.target.value;
    if ( value === this.min ) {
      value = this.max;
    } else {
      value--;
    }
    this.changeModelAndViewValue( this.zeroPadding(value) );
  }


  zeroPadding(value) {
    const valueString = value.toString();
    if ( valueString.length <= 1 ) {
      return '0' + valueString;
    }
    return valueString;
  }

  changeModelAndViewValue(value) {
    this.writeValue( value );
    this.onChange( value );
  }

  onInputBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.input.nativeElement, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }
}
