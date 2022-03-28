import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Folder } from '../../models/folder';
import { Input } from '@angular/core';




@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    todo: []
  };
  
  contextmenu = false;
  contextmenuX = 0;
  contextmenuY = 0;
  
  constructor(private router : Router) { }

 
  OnClick() : void {
    this.router.navigate([`/folder/detail/${this.folder.id}`]);
  }
  onRightClick(event:any,folder:Folder) {
    this.contextmenuX = event.clientX
    this.contextmenuY = event.clientY
    this.folder=folder;
    this.contextmenu = true;
    event.preventDefault()
  }
  clickedOutsideMenu() {
    this.disableContextMenu();
 }
  disableContextMenu() {
    this.contextmenu = false;
  }
}
