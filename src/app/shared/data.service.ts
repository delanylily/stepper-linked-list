import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bookObj = {
    id: '',
    title: '',
    author: '',
    description: '',
    image: ''
  };
  constructor(private firestore: AngularFirestore) { }



  addBookWithId(book: Book, userId: string) {
    this.bookObj.title = book.title;
    this.bookObj.author = book.author;
    this.bookObj.description = book.description !== undefined ? book.description : '';
    this.bookObj.image = book.image;

    let collectionRef = this.firestore.collection(`/users/${userId}/books`);
    return collectionRef.add(this.bookObj).then((docRef) => {
      docRef.update({ id: docRef.id });
    });
  }



  getBooksDocument(userId) {
    return this.firestore.collection(`/users/${userId}/books`).snapshotChanges();

  }

  getUserBooks(userId: string) {
    return this.firestore.collection(`/users/${userId}/books`).valueChanges();
  }

  deleteUserBook(userId: string, bookId: string) {
    const itemRef = this.firestore.doc(`/users/${userId}/books/${bookId}`);
    return itemRef.delete();
  }

  getBooks() {
    return this.firestore.collection('Books').snapshotChanges();
  }

  getAllBooks() {
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



