import { Directive, HostListener, ElementRef, Injector, Type, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { OverlayRef, Overlay, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { TimePickerPanelCtrlRef } from './core/time-picker-panel-ctrl-ref';
import { TimePickerPanelComponent } from './core/time-picker-panel/time-picker-panel.component';
import { TIME_STRING } from './core/injection-tokens';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngxTimePicker]'
})
export class NgxTimePickerDirective implements OnInit, OnDestroy {
  DEFAULT_TIME = '00:00:00';

  ngControl: NgControl;
  overlayRef: OverlayRef;
  timePickerNativeElement: HTMLElement;
  ctrlRef: TimePickerPanelCtrlRef;

  destroy$ = new ReplaySubject(1);

  @HostListener('click')
  toggleTimePicker() {
    if ( this.overlayRef.hasAttached() ) {
      this.overlayRef.detach();
    } else {
      const inputValue = this.ngControl.value;
      const componentPortal = this.createComponentPortal(inputValue);
      const componentRef = this.overlayRef.attach(componentPortal);
      this.timePickerNativeElement = componentRef.instance.el.nativeElement;
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target) {
    if (!this.timePickerNativeElement) { return; }
    const isInputElClicked = this.el.nativeElement.contains( target );
    const isTimePickerClicked = this.timePickerNativeElement.contains( target );
    if ( !isInputElClicked && !isTimePickerClicked ) {
      this.overlayRef.detach();
    }
  }

  constructor(
    private el: ElementRef,
    private overlay: Overlay,
    private injector: Injector,
  ) { }

  ngOnInit() {
    this.ngControl = this.getNgControl();
    this.overlayRef = this.createOverlayRef();
    this.ctrlRef = this.createCtrlRef(this.overlayRef);
    this.trackTimePickerResult();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getNgControl(): NgControl {
    return this.injector.get<NgControl>(NgControl as Type<NgControl>, null);
  }

  createOverlayRef(): OverlayRef {
    const positionStrategy = this.getPositionStrategy();
    const scrollStrategy = this.overlay.scrollStrategies.block();
    return this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  createCtrlRef(overlayRef): TimePickerPanelCtrlRef {
    return new TimePickerPanelCtrlRef(overlayRef);
  }

  getPositionStrategy(): PositionStrategy {
    return this.overlay.position()
    .flexibleConnectedTo(this.el)
    .withPositions([{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    }, {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top'
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top'
    }]);
  }

  createComponentPortal(inputValue): ComponentPortal<TimePickerPanelComponent> {
    const initTime = inputValue || this.DEFAULT_TIME;
    const injector = this.createInjector(this.ctrlRef, initTime);
    return new ComponentPortal(TimePickerPanelComponent, null, injector);
  }

  createInjector(ctrlRef, timeString): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(TimePickerPanelCtrlRef, ctrlRef);
    injectionTokens.set(TIME_STRING, timeString);
    return new PortalInjector(this.injector, injectionTokens);
  }

  trackTimePickerResult() {
    this.ctrlRef.result
      .pipe( takeUntil(this.destroy$) )
      .subscribe( timeString => {
        this.ngControl.control.setValue( timeString );
      });
  }

  // trackBackdropClick() {
  //   const detached$ = this.overlayRef.detachments();
  //   this.overlayRef.backdropClick().pipe( takeUntil(detached$) ).subscribe()
  // }
}
