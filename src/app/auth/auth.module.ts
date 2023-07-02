import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthRoutingModule } from './auth.routing.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    provideAuth(() => getAuth()),

  ],
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent
  ]
})
export class AuthModule { }
