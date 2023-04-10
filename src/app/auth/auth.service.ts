import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, authState, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private router: Router, private readonly auth: Auth) { }

  // login(email: string, password: string) {
  //   this.fireAuth.signInWithEmailAndPassword(email, password).then((res) => {
  //     localStorage.setItem('token', 'true');
  //     if (res.user.emailVerified === true) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.router.navigate(['/verify-email']);
  //     }
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/login']);
  //   })
  // }

  signIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }

  // register(email: string, password: string) {
  //   this.fireAuth.createUserWithEmailAndPassword(email, password).then((res) => {
  //     // this.userService.addUser({res.uid, res.email})
  //     alert('Registration Successful, Please verify email');
  //     this.router.navigate(['/login']);
  //     this.sendEmailForVerification(res.user);
  //   }, err => {
  //     alert(err.message);
  //     this.router.navigate(['/register']);
  //   })
  // }

  // sendEmailForVerification(user: any) {
  //   user.sendEmailVerification().then((res: any) => {
  //     this.router.navigate(['/verify-email']);
  //   }, err => {
  //     alert(err)
  //   })
  // }

  // signInWithGoogle() {
  //   return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
  //     this.router.navigate(['/home']);
  //     localStorage.setItem('token', JSON.stringify(res.user?.uid))
  //   }, err => {
  //     alert(err.message)
  //   })
  // }

  // logout() {
  //   this.fireAuth.signOut().then(() => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }

  // forgotPassword(email: string) {
  //   this.fireAuth.sendPasswordResetEmail(email).then(() => {
  //     this.router.navigate(['/verify-email']);
  //   }, err => {
  //     alert(err)
  //   })
  // }
}
