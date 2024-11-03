import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { CustomersService } from '../Services/customers.service';
import { customer } from '../Interfaces/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, RouterLink,MatIcon,ReactiveFormsModule,FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  customers: customer[] = [];
  loading = true;
  modalService = inject(NgbModal);
  searchCustomerForm : FormGroup = new FormGroup({})
  searchTerm: string = '';
  sortTerm: string = 'asc';

  constructor(private customerService: CustomersService,private snackBar: MatSnackBar){
    
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

  deleteCustomer(customer: customer){
    this.customerService.deleteCustomer(customer).subscribe({
      next: response => {
        //console.log(response)
      },
      error: error =>{
        console.log(error)
      },
      complete: () => {
        this.showSuccess('Customer deleted successfully')
        this.loading = true
        this.customerService.getCustomers().subscribe(data => {
          data.forEach( x => {
            this.customers.push(x)
          })
          this.loading = false
        })
      }
    })
  }

  openConfirmModal(customer: customer) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.result.then(
        (result) => {
            this.deleteCustomer(customer)
            //console.log('Modal closed with:', result);  
        },
        (reason) => {
           // console.log('Modal dismissed with:', reason);
        }
    );
  }

  onSubmit() {
    //client
    this.customerService.getCustomers().subscribe({
      next: response => {
        this.customers = response.filter( customer => customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      },
      complete: () =>{
        console.log(this.customers)
      }
    
    })
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
