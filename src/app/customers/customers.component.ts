import { Component } from '@angular/core';
import { CustomersService } from '../Services/customers.service';
import { customer } from '../Interfaces/customer';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, RouterLink],
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
