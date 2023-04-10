import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { Book } from '../models/book';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.less']
})
export class BooksComponent implements OnInit, OnDestroy {
  booksSubscription: Subscription;
  booksData: any;

  constructor(private router: Router, private angularFirestore: AngularFirestore) { }

  ngOnInit() {
    this.getAllBooks();
  }

  addBook() {
    this.router.navigateByUrl('/add-book')
  }

  getAllBooks() {
    this.booksSubscription = this.angularFirestore.collection('Books').valueChanges().subscribe(data => {
      this.booksData = data;
    })
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
