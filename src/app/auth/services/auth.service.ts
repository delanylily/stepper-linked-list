import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authState, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, updateProfile } from '@angular/fire/auth';
import { forkJoin, from, Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$ = authState(this.auth);
  user$ = this.afAuth.authState;
  authFire = getAuth();

  constructor(private router: Router, private readonly auth: Auth, private afAuth: AngularFireAuth, private http: HttpClient) {
  }

  login(loginForm): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(loginForm.email, loginForm.password));
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut());
  }

  signIn(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // signUp(registerForm): Observable<any> {

  //   return from(createUserWithEmailAndPassword(this.authFire, registerForm.email, registerForm.password));
  // }

  signUp(registerForm): Observable<any> {
    const displayName = registerForm.displayName;

    return from(createUserWithEmailAndPassword(this.authFire, registerForm.email, registerForm.password)).pipe(
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        this.http.post(
          `  https://us-central1-book-hive-6dfe9.cloudfunctions.net/createStreamUser`,
          // `${environment.apiUrl}/createStreamUser`,
          { user: { ...user, displayName } })
      ]))
    );
  }

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
}
