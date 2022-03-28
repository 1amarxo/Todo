import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFacadeService } from '../../services/account-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {

  registerForm: FormGroup;

  description: string = '';

  get email() { return this.registerForm.get('email'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }

  constructor(private accountFacade: AccountFacadeService,
              private router: Router) {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      userName: new FormControl(null, [Validators.pattern('^[A-Za-z][A-Za-z0-9_]{4,20}$'), Validators.required]),
      password: new FormControl(null,[Validators.required])
    })
  }
  async onSubmit() {
    try{
      await this.accountFacade.register(this.registerForm.value);
      this.router.navigate(['/account/login']);
    } catch (error) {
      this.registerForm.reset();
      let currentError = error as HttpErrorResponse;

      if(currentError.status == 0) this.description = 'Server not found [404]';
      else this.description = currentError.error;

    }
  }

}
