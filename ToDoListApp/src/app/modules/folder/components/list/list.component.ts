import { Component, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  @Output() folders : Array<Folder> = [];
  @Output() create=false;

  constructor(private folderService : FolderApiService, private tokenStorage : TokenStorageService) { }

  async ngOnInit() {
    console.log(this.tokenStorage.userId);
    this.folders = await this.folderService.getByUserId(this.tokenStorage.userId) as Array<Folder>;
    
  }
  
  async OnCreateClicked() {
    this.create = true;
  } 

  async OnCreation(bool : boolean) {
    this.create = false;
    if(bool) { 
      this.folders = await this.folderService.getByUserId(this.tokenStorage.userId) as Array<Folder>;
    }
  }



}
