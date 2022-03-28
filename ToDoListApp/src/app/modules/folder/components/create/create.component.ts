import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/modules/account/services/token-storage.service';
import { Folder } from '../../models/folder';
import { FolderApiService } from '../../services/folder-api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @Output() closeCreate : EventEmitter<boolean> = new EventEmitter<boolean>();

  
  createForm: FormGroup;
  get title() { return this.createForm.get('title'); }
  
  constructor(private folderService: FolderApiService,
             private router: Router, 
             private tokenStorage : TokenStorageService) {
    this.createForm = new FormGroup({
      title: new FormControl(null,  [Validators.required])
    })
  }

  async OnSubmit(): Promise<void> {
    this.createForm.value['userId'] = this.tokenStorage.userId;
    await this.folderService.CreateFolder(this.createForm.value);
    this.OnClick(true);
  }

  async OnClick(bool : boolean = false) {
    if(bool) this.closeCreate.emit(true);
    else this.closeCreate.emit(false);
  }
}
