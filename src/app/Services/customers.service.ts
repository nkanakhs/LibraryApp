import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customer } from '../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersUrl = "https://book-api-bx2r.onrender.com/customers"

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<customer[]>{
    console.log('customers request')
    return this.http.get<customer[]>(this.customersUrl);
  }
}
