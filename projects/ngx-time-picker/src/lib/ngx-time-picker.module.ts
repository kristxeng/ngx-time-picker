import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgxTimePickerDirective } from './ngx-time-picker.directive';
import { TimePickerPanelComponent } from './core/time-picker-panel/time-picker-panel.component';
import { TimeInputAccessorComponent } from './core/time-input-accessor/time-input-accessor.component';



@NgModule({
  declarations: [
    NgxTimePickerDirective,
    TimePickerPanelComponent,
    TimeInputAccessorComponent
  ],
  imports: [
    ReactiveFormsModule,
    OverlayModule,
  ],
  exports: [
    NgxTimePickerDirective
  ],
  entryComponents: [
    TimePickerPanelComponent
  ]
})
export class NgxTimePickerModule { }
