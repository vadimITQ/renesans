import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { LoginModel } from '../../models/LoginModels'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  authentificationData: LoginModel = {
    login: '',
    password: ''
  };
  loginForm: FormGroup = this.createLoginForm();
  showErrorMessage: boolean = false;

  get _loginForm(){
    return this.loginForm.get('login');
  }
  
  get _passwordForm() {
    return this.loginForm.get('password');
  }

  get errorMessage(): string {
    return "Не удалось войти в систему. Попробуйте ещё раз";
  }

  createLoginForm(){
    return this.fb.group({
      login: new FormControl(this.authentificationData.login, [Validators.required]),
      password: new FormControl(this.authentificationData.password,  [Validators.required])
    })
  }

  tryAuthenticateUser(): void {
    if (!this._loginForm?.value || !this._passwordForm?.value){
      this.showErrorMessage = true;
      return;
    }
    else{
      this.authService.login();
    }
  }

}
