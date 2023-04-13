import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";

const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-password', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

]
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
