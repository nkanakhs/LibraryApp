import { Component } from '@angular/core';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CustomDatePipe } from '../customDate.pipe';
import { RouterLink } from '@angular/router';
import { MatIcon, MatIconRegistry } from "@angular/material/icon";
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule,CustomDatePipe,RouterLink,MatFormField,MatIcon,FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [CustomDatePipe]
})
export class BooksComponent {

  books : book[] = [];
  loading = true;
  searchTerm = '';
  filteredbooks: book[] = [];

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

  deleteBook(book : book){
    this.bookService.deleteBook(book).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

  onSearch(){
    if(this.searchTerm.length > 2)
    {
      // client side 
      // this.bookService.getBooks().subscribe({
      //   next: response => {
      //     this.books = response.filter( book => book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      //     )
      //   },
      //   complete: () => 
      //     console.log(this.filteredbooks)
      // })
      
      //  server side
      this.bookService.getBooksWithParams(this.searchTerm).subscribe({
        next: response => {
          this.books = response
        }
      })
    }

  }

}
