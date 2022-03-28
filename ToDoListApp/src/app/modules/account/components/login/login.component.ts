import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup;

  description:string='';
  
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  constructor(private accountFacade: AccountFacadeService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [ Validators.required])
    })
  }
   
  async onSubmit(){
    try{
      await this.accountFacade.login(this.loginForm.value);
      this.router.navigate(['/folder/list']);
    }
    catch(error){
      this.loginForm.reset();
      let currentError = error as HttpErrorResponse;

      if(currentError.status == 0) this.description = 'Server not found [404]';
      else this.description = currentError.error;
    }
  }

}
