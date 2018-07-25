import { Component, OnInit } from '@angular/core';
const remove = (itemName: string, list: string[]) => {
  const itemIndex = list.indexOf(itemName);
  if (itemIndex > -1) {
    list.splice(itemIndex, 1);
  }
};

@Component({
  selector: 'app-droppable-behaviour-example',
  templateUrl: './droppable-behaviour-example.component.html',
  styleUrls: ['./droppable-behaviour-example.component.css']
})
export class DroppableBehaviourExampleComponent implements OnInit {
  currentDraggingBox?: string;
  availableBoxes = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
    'Box 5',
    'Box 6',
    'Box 7',
    'Box 8'
  ];
  dropzone1Boxes = ['Dropzone 1 Box'];
  dropzone2Boxes = ['Dropzone 2 Box'];
  constructor() {}

  ngOnInit() {}

  move(currentDraggingBox: string, toList: string[]) {
    remove(currentDraggingBox, this.availableBoxes);
    remove(currentDraggingBox, this.dropzone1Boxes);
    remove(currentDraggingBox, this.dropzone2Boxes);

    toList.push(currentDraggingBox);
  }
}
