import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookUrl= 'https://book-api-bx2r.onrender.com/books'; 

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<book[]>{
    console.log('request made')
    return this.http.get<book[]>(this.bookUrl);
  }

}
