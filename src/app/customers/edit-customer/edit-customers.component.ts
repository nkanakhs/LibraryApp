import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../Services/customers.service';
import { customer } from '../../Interfaces/customer';
import { FormControl, FormGroup, Validators, FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-customers.component.html',
  styleUrl: './edit-customers.component.css'
})
export class EditCustomersComponent {

  customer_id : string | null = null;
  customer !: customer;
  title : string = '';
  // buttonDisabled: boolean = false;

  editCustomerForm : FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private customerService: CustomersService){
    this.editCustomerForm = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      surname: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required , Validators.email]),
      phoneNumber: new FormControl('', [Validators.required , Validators.minLength(8)])
    });
  }

  ngOnInit() {
    
    this.customer_id = this.route.snapshot.params["id"];

    if (this.customer_id){  // we are in the edit customer mode

      this.title = 'Edit Customer';
      this.customerService.getCustomer(this.customer_id).subscribe((data) =>{

        this.customer = data;
        
        this.editCustomerForm.controls['name'].setValue(this.customer.name);
        this.editCustomerForm.controls['surname'].setValue(this.customer.surname);
        this.editCustomerForm.controls['email'].setValue(this.customer.email);
        this.editCustomerForm.controls['phoneNumber'].setValue(this.customer.phoneNumber);
        
      })
    }else{ // add customer mode
      // this.buttonDisabled = true;
      this.title = 'Add Customer';
    }

  }

  onSubmit(){
    
    console.log('name of the form:' +this.editCustomerForm.controls['name'].value)
    console.log('status of the form:' + this.editCustomerForm.valid )
    if(this.customer_id){ //on the edit customer
      if(this.editCustomerForm.valid){
        this.customer = {
          _id: this.customer_id,
          name: this.editCustomerForm.controls['name'].value,
          surname: this.editCustomerForm.controls['surname'].value,
          email:this.editCustomerForm.controls['email'].value,
          phoneNumber: this.editCustomerForm.controls['phoneNumber'].value
        }
        this.customerService.editCustomer(this.customer).subscribe(data =>{
          console.log(data)
        }, error =>{
          console.log(error)
        });
      }
    }else{  //add new customer
      if(this.editCustomerForm.valid){
        this.customer = {
          name: this.editCustomerForm.controls['name'].value,
          surname: this.editCustomerForm.controls['surname'].value,
          email:this.editCustomerForm.controls['email'].value,
          phoneNumber: this.editCustomerForm.controls['phoneNumber'].value
        }
        this.customerService.addCustomer(this.customer).subscribe(data =>{
          console.log(data)
        }, error =>{
          console.log(error)
        });
      }
    }
  }

}
