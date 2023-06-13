import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { from, Observable, Subject } from 'rxjs';
import { Book } from '../models/book';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  onFavouriteAdded = new Subject<null>();
  onFavouriteAdded$ = this.onFavouriteAdded.asObservable();
  bookObj = {
    id: '',
    title: '',
    author: '',
    userId: '',
    description: '',
    image: '',
    availability: ''
  };
  constructor(private firestore: AngularFirestore, private toastr: HotToastService) { }

  favouriteAdded() {
    this.onFavouriteAdded.next(null);
  }

  addBookWithId(book: Book, userId: string) {
    this.bookObj.title = book.title;
    this.bookObj.userId = userId;
    this.bookObj.author = book.author;
    this.bookObj.description = book.description !== undefined ? book.description : '';
    this.bookObj.image = book.image;
    this.bookObj.availability = book.availability;

    let collectionRef = this.firestore.collection(`/users/${userId}/books`);
    return collectionRef.add(this.bookObj).then((docRef) => {
      docRef.update({ id: docRef.id });
    });
  }

  addToSaved(userId: string, book: Book) {
    let collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
    return collectionRef.add(book).then((docRef) => {
      docRef.update({ id: book.id });
    });
  }

  addToMatches(userId: string, matchDetails: any): Observable<any> {
    let collectionRef = this.firestore.collection(`/users/${userId}/matches`);
    return from(collectionRef.add(matchDetails));
  }

  addToRequested(userId: string, requestedBook: any): Observable<any> {
    let collectionRef = this.firestore.collection(`/users/${userId}/requests`);
    return from(collectionRef.add(requestedBook));
  }

  getUserRequests(userId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/requests`).valueChanges();
  }

  getUserBook(userId: string, bookId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/books`).doc(bookId).valueChanges();
  }

  getUserFavourites(userId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/favourites`).valueChanges();
  }

  getUserMatches(userId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/matches`).valueChanges();
  }

  updateBookAvailability(userId: string, bookId: string, availability: string): Observable<any> {
    let collectionRef = this.firestore.collection('users').doc(userId).collection('books').doc(bookId);
    return from(collectionRef.update({ availability: availability }));
  }

  getBooksDocument(userId) {
    return this.firestore.collection(`/users/${userId}/books`).snapshotChanges();
  }

  getUserBooks(userId: string) {
    return this.firestore.collection(`/users/${userId}/books`).valueChanges();
  }

  getAllBooks(): Observable<Book[]> {
    return this.firestore.collectionGroup<Book>('books').valueChanges();
  }


  deleteUserBook(userId: string, bookId: string) {
    const itemRef = this.firestore.doc(`/users/${userId}/books/${bookId}`);
    return itemRef.delete();
  }

  getFavouritesDocument(userId) {
    return this.firestore.collection(`/users/${userId}/favourites`).snapshotChanges();
  }

  removeFromFavourites(userId: string, bookId: string) {
    const collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
    const query = collectionRef.ref.where('id', '==', bookId);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          this.toastr.success('Book removed from favourites');
          location.reload();
        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }

  getBooks() {
    return this.firestore.collection('Books').snapshotChanges();
  }

  deleteBook(book: Book) {
    return this.firestore.doc('/Books/' + book.id).delete();
  }

  // updateBook(book: Book) {
  //   this.deleteBook(book);
  //   this.addBook(book);
  // }
}



