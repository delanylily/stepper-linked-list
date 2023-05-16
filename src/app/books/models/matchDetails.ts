import { Book } from "src/app/models/book";

export class BookMatchDetails {
  availability: string;
  image: string;
  title: string;

  constructor(book: Book) {
    this.availability = book.availability;
    this.image = book.image;
    this.title = book.title;
  }
}
