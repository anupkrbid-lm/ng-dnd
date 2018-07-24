import { DraggableHelperDirective } from './draggable-helper.directive';
import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
  ContentChild
} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @ContentChild(DraggableHelperDirective) helper: DraggableHelperDirective;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.draggable') draggable = true;
  @HostBinding('class.dragging') dragging = false;

  constructor() {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.dragging = true;
    this.dragStart.emit(event);

    // render the helper
    this.helper.onDragStart();
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.dragEnd.emit(event);

    // clear the helper
    this.helper.onDragEnd();
  }
}
