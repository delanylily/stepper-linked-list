import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bookObj = {
    id: '',
    title: '',
    author: '',
    userId: '',
    description: '',
    image: '',
    availability: ''
  };
  constructor(private firestore: AngularFirestore) { }



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

  addToSaved(userId: string, bookId: string, bookOwnerId: string): Observable<any> {
    const savedBook = { bookId: bookId, bookOwnerId: bookOwnerId };
    let collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
    return from(collectionRef.add(savedBook));
  }

  getUserBook(userId: string, bookId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/books`).doc(bookId).valueChanges();
  }

  getUserFavourites(userId: string): Observable<any> {
    return this.firestore.collection(`/users/${userId}/favourites`).valueChanges();
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



