import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterPath } from 'src/app/shared/enums/router.enums';
import { AuthService } from '../../services/auth/auth.service';
import { LoginModel } from '../../../shared/models/login-models';
import { ToastService } from '../../../shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router, 
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { }

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
    this.loadingService.showLoading();
    this.authService
      .login({ connectionName: this._loginForm.value, connectionPassword: this._passwordForm.value })
      .subscribe({
        next: (response) => {
          if (response?.auth){
            this.toastService.showSuccessToast("Аутентификация пользователя прошла успешно");
            this.router.navigate([RouterPath.PaymentEngine, RouterPath.SearchPayment]);
          }
          else{
            this.showErrorMessage = true;
            return;
          }
        },
        error: (error) => {
          this.showErrorMessage = true;
          this.loadingService.hideLoading();
        },
        complete: () => {
          this.loadingService.hideLoading();
        }
      });
  }

}
