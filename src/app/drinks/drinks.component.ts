import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { exhaustMap, Subject } from 'rxjs';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.less']
})
export class DrinksComponent {
  buttonSubject: Subject<any> = new Subject();

  constructor(private readonly http: HttpClient) {
    this.buttonSubject.pipe(exhaustMap(() => this.getDrinks())).subscribe(response => {
      console.log(response);
    })
  }

  clickButton() {
    this.buttonSubject.next(true);
  }

  getDrinks() {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
    // .subscribe(response => {
    //   console.log(response);
    // })
  }

}
