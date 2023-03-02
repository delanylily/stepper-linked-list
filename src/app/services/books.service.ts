import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BooksService {
  constructor(private readonly http: HttpClient) { }

  getBooks(query: string) {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
  }
}

