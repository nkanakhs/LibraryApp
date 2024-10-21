import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import { CustomDatePipe } from '../customDate.pipe';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CustomDatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [CustomDatePipe]
})
export class HomepageComponent {
  loading = true;
  availableBooks: book[] = [];

  constructor(private bookService: BookService, private customDatePipe: CustomDatePipe){}

  ngOnInit(){
    this.getHomepage();
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
