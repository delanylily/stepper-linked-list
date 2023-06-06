import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authState, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$ = authState(this.auth);
  user$ = this.afAuth.authState;
  authFire = getAuth();

  constructor(private router: Router, private readonly auth: Auth, private afAuth: AngularFireAuth) {
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  signIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }


  // signIn(email: string, password: string): Observable<User> {
  //   return new Observable(observer => {
  //     this.afAuth.createUserWithEmailAndPassword(email, password)
  //       .then(userCredential => {
  //         const user: User = { // map user credential to your user model
  //           uid: userCredential.user.uid,
  //           email: userCredential.user.email,
  //           // ... other user properties
  //         };
  //         observer.next(user);
  //         observer.complete();
  //       })
  //       .catch(error => {
  //         observer.error(error);
  //       });
  //   });
  // }

  signUp(displayName: string, email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.authFire, email, password));
  }

  // signUp(email: string, password: string): Observable<any> {
  //   return from(createUserWithEmailAndPassword(this.authFire, email, password));
  // }

  forgotPassword(email: string): Observable<void> {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    });
  }

  // login(email: string, password: string) {
  //   this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
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

  // logout() {
  //   this.auth.signOut().then(() => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }

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






}
