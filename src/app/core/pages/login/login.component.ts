import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../../shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PeNavigationService } from '../../services/pe-navigation/pe-navigation.service';
import { LoginForm, LoginModel } from './login.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private peNavigationService: PeNavigationService
  ) { }

  authentificationData: LoginModel = {
    login: '',
    password: ''
  };
  loginForm: FormGroup<LoginForm> = this.createLoginForm();

  get errorMessage(): string {
    const errors = this.loginForm.errors;
    if (!!errors){
      const required = !!errors["required"] === true;
      const failed = !!errors["failed"] === true;
      if (required){
        return "";
      }
      if (failed){
        return "Введён неверный логин или пароль. Попробуйте еще раз";
      }
    }
    return "";
  }

  get loginRequired(): boolean {
    return (this.loginForm.touched || this.loginForm.dirty) && this.loginForm.controls.login.hasError('required');
  }

  get passwordRequired(): boolean {
    return (this.loginForm.touched || this.loginForm.dirty) && this.loginForm.controls.password.hasError('required');
  }

  createLoginForm(){
    return this.fb.group<LoginForm>({
      login: new FormControl(this.authentificationData.login, [Validators.required]),
      password: new FormControl(this.authentificationData.password,  [Validators.required])
    },{
      updateOn: 'change'
    });
  }

  tryAuthenticateUser(): void {
    if (!this.loginForm.controls.login.value || !this.loginForm.controls.password.value){
      this.loginForm.setErrors({required: true});
      return;
    }
    this.loadingService.showLoading();
    this.authService
      .login({ 
          connectionName: this.loginForm.controls.login.value, 
          connectionPassword: this.loginForm.controls.password.value 
      })
      .subscribe({
        next: (response) => {
          if (response?.auth){
            this.toastService.showSuccessToast("Аутентификация пользователя прошла успешно");
            this.peNavigationService.goToSearchPayment();
          }
          else{
            this.loginForm.setErrors({failed: true});
            return;
          }
        },
        error: (error) => {
          this.loginForm.setErrors({failed: true});
          this.loadingService.hideLoading();
        },
        complete: () => {
          this.loadingService.hideLoading();
        }
      });
  }

}
