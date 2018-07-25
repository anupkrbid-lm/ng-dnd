import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  SkipSelf
} from '@angular/core';

import { DroppableService } from '../services/droppable.service';

@Directive({
  selector: '[appDropzone]',
  providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {
  @HostBinding('class.dropzone-active') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<PointerEvent>();
  @Output() remove = new EventEmitter<PointerEvent>();

  private clientRect: ClientRect;

  constructor(
    @SkipSelf() private globalDroppableService: DroppableService,
    private localDroppableService: DroppableService,
    private element: ElementRef
  ) {}

  ngOnInit(): void {
    // Global Service Instance
    this.globalDroppableService.dragStart$.subscribe(event =>
      this.onGlobalDragStart(event)
    );
    this.globalDroppableService.dragEnd$.subscribe(event =>
      this.onGlobalDragEnd(event)
    );

    this.globalDroppableService.dragMove$.subscribe(event => {
      if (this.isEventInside(event)) {
        this.onPointerEnter();
      } else {
        this.onPointerLeave();
      }
    });

    // Local Service Instance
    this.localDroppableService.dragStart$.subscribe(event =>
      this.onLocalDragStart(event)
    );
    this.localDroppableService.dragEnd$.subscribe(event =>
      this.onLocalDragEnd(event)
    );
  }

  private isEventInside(event: PointerEvent): boolean {
    return (
      event.clientX >= this.clientRect.left &&
      event.clientX <= this.clientRect.right &&
      event.clientY >= this.clientRect.top &&
      event.clientY <= this.clientRect.bottom
    );
  }

  private onPointerEnter(): void {
    if (!this.activated) {
      return;
    }
    this.entered = true;
  }

  private onPointerLeave(): void {
    if (!this.activated) {
      return;
    }
    this.entered = false;
  }

  onGlobalDragStart(event: PointerEvent): void {
    this.clientRect = this.element.nativeElement.getBoundingClientRect();
    this.activated = true;
  }

  onGlobalDragEnd(event: PointerEvent): void {
    if (!this.activated) {
      return;
    }

    if (this.entered) {
      console.log('dropped');
      this.drop.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }

  onLocalDragStart(event: PointerEvent): void {
    this.activated = true;
    this.entered = true;
  }

  onLocalDragEnd(event: PointerEvent): void {
    if (!this.entered) {
      console.log('removed');
      this.remove.emit(event);
    }
    this.activated = false;
    this.entered = false;
  }
}
