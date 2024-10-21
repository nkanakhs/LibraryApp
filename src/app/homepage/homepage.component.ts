import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterLink,DatePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  loading = true;
  availableBooks: book[] = [];

  constructor(private bookService: BookService){}

  ngOnInit(){
    this.getHomepage();
  }

  getHomepage(){
    this.bookService.getBooks().subscribe(data => {
      data.map(x => {
        if (x.available){
          this.availableBooks.push(x);
        }
      })
      this.loading = false
    })
  }
  
}
