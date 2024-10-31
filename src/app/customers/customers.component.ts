import { Component, inject } from '@angular/core';
import { CustomersService } from '../Services/customers.service';
import { customer } from '../Interfaces/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
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
  modalService = inject(NgbModal);


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

  deleteCustomer(customer: customer){
    this.customerService.deleteCustomer(customer).subscribe(data =>{
      console.log(data)
    }, error =>{
      console.log(error)
    });
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
}
