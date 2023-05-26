import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, doc, docData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { updateProfile } from 'firebase/auth';
import { collection, query } from 'firebase/firestore';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  constructor(private afAuth: AngularFireAuth, private firestore: Firestore, private authenticationService: AuthService, private angularFS: AngularFirestore) {
    this.currentUser = this.afAuth.currentUser;
  }

  get currentUserProfile$(): Observable<User | null> {
    return this.authenticationService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<User>;
      })
    );
  }

  // getCurrentUser$(): Observable<User | null> {
  //   return this.authenticationService.currentUser$.pipe(
  //     switchMap(user => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }
  //       const ref = doc(this.firestore, 'users', user?.uid);
  //       return docData(ref) as Observable<User>;
  //     })
  //   );
  // }

  getUser(userId: string) {
    return this.angularFS.doc<User>(`users/${userId}`).valueChanges();
  }

  updateProfilePhotoUrl(photoUrl: string): Observable<any> {
    return from(updateProfile(this.currentUser, { photoURL: photoUrl }));
  }

  get allUsers$(): Observable<User[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<User[]>;
  }

  updateUser(userId: string, userDetails: any): Observable<any> {
    const ref = doc(this.firestore, 'users', userId);
    return from(updateDoc(ref, { userDetails }));
  }

  addUser(user: User): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  getProfileImage(userId: string) {
    const ref = doc(this.firestore, 'users', userId, 'profileImg');

  }

}
