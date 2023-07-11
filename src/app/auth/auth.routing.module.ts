import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";

type PathMatch = "full" | "prefix" | undefined;

const routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' as PathMatch },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
