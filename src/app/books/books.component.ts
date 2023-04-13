import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    this.booksSubscription = this.angularFirestore.collection('Books').valueChanges().subscribe(data => {
      this.booksData = data;
    });
  }

  addBook() {
    this.router.navigateByUrl('/add-book')
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }
}
