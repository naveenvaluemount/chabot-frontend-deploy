import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input() node;

  public isAdd: boolean = false;
  public selectedNode: any = {};
  public name: string = '';

  constructor() { }

  ngOnInit() { }

  add(node: any) {
    this.isAdd = true;
    this.selectedNode = node;
  }

  addNode() {
    this.isAdd = false;
    this.selectedNode.children.push({
      name: this.name,
      children: [],
    });
  }

  remove(parentNode, childIndex) {
    console.log(parentNode);
    parentNode.children.splice(childIndex, 1);
    console.log(parentNode);
  }
}
