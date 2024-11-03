import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookUrl= 'https://book-api-bx2r.onrender.com/books'; 
  specificBookUrl= 'https://book-api-bx2r.onrender.com/books/'; 

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<book[]>{
    return this.http.get<book[]>(this.bookUrl);
  }
  
  getBooksWithParams(searchTerm: string, sortParam:string): Observable<book[]>{
    const baseParams = new HttpParams().set('search', searchTerm)
    return this.http.get<book[]>(this.specificBookUrl ,{ params:baseParams.set('sort', sortParam)});
  }

  getBook(id: string): Observable<book>{
    return this.http.get<book>(this.specificBookUrl + id);
  }
  

  editBook(book: book): Observable<book>{
    return this.http.put<book>(this.specificBookUrl + book._id , book);
  }

  addBook(book: book): Observable<any>{
    return this.http.post<book>(this.bookUrl , book);
  }

  deleteBook(book: book): Observable<any>{
    //console.log("book name:" + book.name + "book id:" + book._id)
    return this.http.delete(this.specificBookUrl + book._id)
  }
}
