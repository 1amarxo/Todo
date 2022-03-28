import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountFacadeService } from 'src/app/modules/account/services/account-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  constructor(private facade : AccountFacadeService, private router: Router) { }



  OnClick() : void {
    if(this.facade.isAuthenticated()) this.router.navigate(['/folder/list']);
    else this.router.navigate(['/account/login']);
  }
}
