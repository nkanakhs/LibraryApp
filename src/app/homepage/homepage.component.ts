import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import { CustomDatePipe } from '../customDate.pipe';
import { CeilPipe } from "../ceil.pipe";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CustomDatePipe, CeilPipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [CustomDatePipe]
})
export class HomepageComponent {
  loading = true;
  availableBooks: book[] = [];

  currentPage = 1;
  itemsPerPage = 6;

  constructor(private bookService: BookService, private customDatePipe: CustomDatePipe){}

  ngOnInit(){
    this.getHomepage();
  }

  get paginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.availableBooks.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.availableBooks.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getHomepage(){
    this.bookService.getBooks().subscribe(data => {
      data.forEach(x => {
        if (x.available){
          x.createdOn = this.customDatePipe.transform(x.createdOn)
          this.availableBooks.push(x)
        }
      })
      this.loading = false
    })
  }
  
}
