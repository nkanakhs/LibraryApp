import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customer } from '../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  customersUrl = "https://book-api-bx2r.onrender.com/customers"
  specificCustumer = "https://book-api-bx2r.onrender.com/customers/"

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<customer[]>{
    //console.log('customers request')
    return this.http.get<customer[]>(this.customersUrl);
  }

  getCustomer( _id: string): Observable<customer>{
    //console.log('customers id:' + _id)
    return this.http.get<customer>(this.specificCustumer + _id);
  }

  editCustomer( customer: customer): Observable<any>{
    //console.log('customers id:' + customer._id)
    return this.http.put<customer>(this.specificCustumer+customer._id, customer);
  }

  addCustomer(customer: customer): Observable<any> {
    //console.log('customer:' + customer)
    return this.http.post(this.customersUrl , customer)
  }

  deleteCustomer(customer: customer): Observable<any>{
    //console.log('customers id: ' + customer._id)
    return this.http.delete(this.specificCustumer + customer._id)
  }
}
