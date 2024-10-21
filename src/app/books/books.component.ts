import { Component } from '@angular/core';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CustomDatePipe } from '../customDate.pipe';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatDividerModule,CustomDatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [CustomDatePipe]
})
export class BooksComponent {

  books : book[] = [];
  loading = true;

  constructor(private customDatePipe: CustomDatePipe, private bookService: BookService){

  }

  ngOnInit(){
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: book[]) => {
        this.books = data.map(x => ({
          ...x,
          createdOn: this.customDatePipe.transform(x.createdOn)
        }))
        this.loading = false
      }); 
  }

}
