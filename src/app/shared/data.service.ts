import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  addBook(book: Book, userId: string) {
    this.bookObj.id = this.firestore.createId();
    this.bookObj.title = book.title;
    this.bookObj.author = book.author;
    this.bookObj.description = book.description !== undefined ? book.description : '';
    this.bookObj.image = book.image;
    return this.firestore.collection(`/users/${userId}/books`).add(this.bookObj);
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



