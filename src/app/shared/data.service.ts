import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { doc, Firestore } from '@angular/fire/firestore';
// import { doc, getDoc } from 'firebase/firestore';
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

  }

  constructor(private firestore: AngularFirestore,) { }

  addBook(book: Book) {
    this.bookObj.id = this.firestore.createId();
    this.bookObj.title = book.title;
    this.bookObj.author = book.author;
    this.bookObj.description = book.description !== undefined ? book.description : '';
    this.bookObj.image = book.image;
    return this.firestore.collection('/Books').add(this.bookObj);

  }

  getBooks() {
    // const ref = doc(this.fire, 'Books', ?.id)
    return this.firestore.collection('Books').snapshotChanges();
  }

  getAllBooks() {
    return this.firestore.collection('Books').snapshotChanges();
  }

  deleteBook(book: Book) {
    return this.firestore.doc('/Books/' + book.id).delete();
  }

  updateBook(book: Book) {
    this.deleteBook(book);
    this.addBook(book);
  }

}



