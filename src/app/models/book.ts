export class Book {
  id;
  title;
  author;
  subtitle;
  description;
  image;
  constructor(book: any) {
    this.title = book.title;
    this.author = book.authors[0];
    this.subtitle = book.subtitle;
    this.description = book.description;
    this.image = book.imageLinks.thumbnail;
  }
}
