import { Injectable, SkipSelf, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DroppableService {
  dragStart$: Observable<PointerEvent>;
  dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;
  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor(
    @SkipSelf()
    @Optional()
    private parentDroppableService: DroppableService
  ) {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: PointerEvent): void {
    this.dragStartSubject.next(event);

    // if parent present propagate the event to parent
    if (this.parentDroppableService) {
      this.parentDroppableService.onDragStart(event);
    }
  }

  onDragMove(event: PointerEvent): void {
    this.dragMoveSubject.next(event);

    // if parent present propagate the event to parent
    if (this.parentDroppableService) {
      this.parentDroppableService.onDragMove(event);
    }
  }

  onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next(event);

    // if parent present propagate the event to parent
    if (this.parentDroppableService) {
      this.parentDroppableService.onDragEnd(event);
    }
  }
}
