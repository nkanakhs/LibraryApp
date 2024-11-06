import { Component, TemplateRef,ViewChild,inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../Services/customers.service';
import { customer } from '../../Interfaces/customer';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,NgIf],
  templateUrl: './edit-customers.component.html',
  styleUrl: './edit-customers.component.css'
})
export class EditCustomersComponent {

  isDisabled: boolean = false;
  loading = true;
  customer_id : string | null = null;
  customer !: customer;
  title : string = '';

  editCustomerForm : FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private customerService: CustomersService,private router: Router,private snackBar: MatSnackBar){
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
      this.customerService.getCustomer(this.customer_id).subscribe({
        next: response =>{
          this.customer = response;

          this.editCustomerForm.controls['name'].setValue(this.customer.name);
          this.editCustomerForm.controls['surname'].setValue(this.customer.surname);
          this.editCustomerForm.controls['email'].setValue(this.customer.email);
          this.editCustomerForm.controls['phoneNumber'].setValue(this.customer.phoneNumber);
        },
        complete: () =>{
          this.loading = false
        }
      })
    }else{ // add customer mode
      this.loading = false
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
        this.customerService.editCustomer(this.customer).subscribe({
          next: response =>{
            this.showSuccess("Customer's data changed successfully!")
            //console.log(response)
          },
          error: error => console.log(error)
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
        this.customerService.addCustomer(this.customer).subscribe({
          next: response => {
          },
          error: error => {console.log(error)
          },
          complete: () => {
            this.showSuccess("Customer added successfully!")
            this.router.navigate(['/customers'])
          }
        });
      }
    }
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }


}
