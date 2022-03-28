import { Component, Input, OnInit, Output } from '@angular/core';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-folder-contextmenu',
  templateUrl: './folder-contextmenu.component.html',
  styleUrls: ['./folder-contextmenu.component.scss']
})
export class FolderContextmenuComponent implements OnInit {

  @Output() update : boolean = false;
  @Input() x=0;
  @Input() y=0;
  @Input() folder : Folder = {
    id: '',
    title: '',
    userId: '',
    date: new Date(),
    todo: []
  };
  constructor(private folderApiService:FolderApiService) { }

  ngOnInit(): void {
  }
  
  async OnEditClicked(){
    this.update=true;
  }
  async OnUpdate(bool : boolean){
    this.update=false;
  }
}
