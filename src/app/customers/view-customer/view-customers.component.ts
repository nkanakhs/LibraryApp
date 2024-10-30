import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { customer } from '../../Interfaces/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../Services/customers.service';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './view-customers.component.html',
  styleUrl: './view-customers.component.css'
})
export class ViewCustomersComponent {

  customer !: customer ;
  customer_id : string = '';
  title: string = 'View customer'

  viewcustomerForm : FormGroup = new FormGroup ({});

  constructor(private route: ActivatedRoute, private customerService: CustomersService){
    this.viewcustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required , Validators.email]),
      phoneNumber: new FormControl('', [Validators.required , Validators.minLength(8)])
    })
  }

  ngOnInit(){
    this.customer_id = this.route.snapshot.params["id"];

    if(this.customer_id){

      this.customerService.getCustomer(this.customer_id).subscribe((data) =>{

        this.customer = data;
        
        this.viewcustomerForm.controls['name'].setValue(this.customer.name);
        this.viewcustomerForm.controls['surname'].setValue(this.customer.surname);
        this.viewcustomerForm.controls['email'].setValue(this.customer.email);
        this.viewcustomerForm.controls['phoneNumber'].setValue(this.customer.phoneNumber);
        
      })
    }
  }
}
