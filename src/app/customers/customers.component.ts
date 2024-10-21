import { Component } from '@angular/core';
import { CustomersService } from '../Services/customers.service';
import { customer } from '../Interfaces/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customers: customer[] = [];
  loading = true;

  constructor(private customerService: CustomersService){

  }

  ngOnInit(){
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(data => {
      data.forEach( x => {
        this.customers.push(x)
      })
      this.loading = false
    })
  }
}
