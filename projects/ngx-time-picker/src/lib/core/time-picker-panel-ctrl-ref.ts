import { Subject } from 'rxjs';

import { OverlayRef } from '@angular/cdk/overlay';

export class TimePickerPanelCtrlRef {

  private result$ = new Subject();

  get result() {
    return this.result$;
  }

  constructor(
    private overlayRef: OverlayRef,
    ) { }

  close(result?) {
    if (result) {
      this.result$.next(result);
    }
    this.overlayRef.detach();
  }
}
