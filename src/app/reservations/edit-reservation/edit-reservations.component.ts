import { Component } from '@angular/core';
import { customer } from '../../Interfaces/customer';
import { book } from '../../Interfaces/book';
import { BookService } from '../../Services/book.service';
import { CustomersService } from '../../Services/customers.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { postReservation, reservation } from '../../Interfaces/reservation';
import { ReservationsService } from '../../Services/reservations.service';

@Component({
  selector: 'app-edit-reservation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-reservations.component.html',
  styleUrl: './edit-reservations.component.css'
})
export class EditReservationsComponent {

  customers : customer[] =[];
  books : book[] = [];
  reservation !: postReservation ;
  title = 'Add new reservation'

  addReservationForm : FormGroup = new FormGroup({});
  
  constructor(private bookService: BookService, private customerService: CustomersService, private reservationService : ReservationsService){
    this.addReservationForm = new FormGroup({
      book: new FormControl('', Validators.required ),
      customer: new FormControl('', Validators.required ),
      returnedBy: new FormControl('', Validators.required )
    })
  }

  ngOnInit(){

    //get available books
    this.bookService.getBooks().subscribe( {
      next: response => {
         response.forEach( x => {
          if (x.available) {
            this.books.push(x)
          } 
         })
        }
    })

    //get all customers
    this.customerService.getCustomers().subscribe({
      next: response => {
        response.forEach( x => {
          this.customers.push(x)
        })
      }
    })

    
  }

  onSubmit(){
    if(this.addReservationForm.valid){
      this.reservation = {
        book_id: this.addReservationForm.controls['book'].value,
        customer_id: this.addReservationForm.controls['customer'].value,
        returnBy: this.addReservationForm.controls['returnedBy'].value
      }
      console.log(this.reservation)
      this.reservationService.postReservation(this.reservation).subscribe({
        next: response => {
          console.log("reservation submitted!" + response)
        },
        error: error =>{
          console.log(error)
        }
      })
    }
  }

}
