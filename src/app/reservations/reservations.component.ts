import { Component } from '@angular/core';
import { ReservationsService } from '../Services/reservations.service';
import { reservation } from '../Interfaces/reservation';
import { CustomDatePipe } from '../customDate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { customer } from '../Interfaces/customer';
import { CustomersService } from '../Services/customers.service';
import { CeilPipe } from "../ceil.pipe";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, CustomDatePipe, RouterLink, CeilPipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  providers: [CustomDatePipe]
})
export class ReservationsComponent {

  loading = true;
  reservations: reservation[] = [];
  customers: customer[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private customDatePipe: CustomDatePipe, private reservationsService: ReservationsService,
              private customerService: CustomersService,private snackBar: MatSnackBar){

  }

  ngOnInit(){   
    this.getReservations();
  }

  getReservations (){
    this.reservationsService.getReservations().subscribe({
      next: reservations => {
        reservations.forEach( reservation => {
          const hasValidBook = reservation.book && reservation.book._id;

          if (reservation.customer && reservation.customer._id) { //customer exists, we check if book exists
            this.customerService.getCustomer(reservation.customer._id).subscribe({
              next : customer =>{
                  this.reservations.push({
                    ...reservation,
                    customer,
                    book: hasValidBook? reservation.book : {name:'Book removed', available:false , type:'Uknown' , createdOn: new Date()
                                                                  , year: NaN, author: 'Unknown author', _id: 'N/A' },
                    reservedOn: this.customDatePipe.transform(reservation.reservedOn),
                    returnBy: this.customDatePipe.transform(reservation.returnBy)
                  })

              },
              error: error => 
                {
                  //console.warn(`Customer with ID ${reservation._id} not found. Adding reservation with placeholder.`);
                  // Fallback - Add reservation without customer details
                  this.reservations.push({
                    ...reservation,
                    customer: { name: 'Customer ', _id: 'N/A', email: '', phoneNumber:'' , surname:'Removed'}, // Placeholder customer data
                    book: hasValidBook? reservation.book : {name:'Book removed', available:false , type:'Uknown' , createdOn: new Date()
                      , year: NaN, author: 'Unknown author', _id: 'N/A' },
                    reservedOn: this.customDatePipe.transform(reservation.reservedOn),
                    returnBy: this.customDatePipe.transform(reservation.returnBy)
                  }) 
                }
          })   
        }else{ // handles the case both customer and book removed
          //console.warn(`Reservation with ID ${reservation._id} has no customer ID. Adding placeholder.`);
          // Fallback - Add reservation with placeholder if no customer ID is available
          this.reservations.push({
            ...reservation,
            customer: { name: 'Customer ', _id: 'N/A', email: '', phoneNumber: '', surname: 'Removed' }, // Placeholder customer data
            book: hasValidBook? reservation.book : {name:'Book removed', available:false , type:'Uknown' , createdOn: new Date()
              , year: NaN, author: 'Unknown author', _id: 'N/A' },
            reservedOn: this.customDatePipe.transform(reservation.reservedOn),
            returnBy: this.customDatePipe.transform(reservation.returnBy)
          });
        }
      })
    },
    error: error => {
      //console.error('Failed to load reservations:', error);
    },
    complete: () => {
      this.loading = false;
    }
    }); 
  }

  get paginatedReservations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.reservations.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.reservations.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  releaseReservation(reservation : reservation){
    this.reservationsService.releaseReservation(reservation).subscribe({
        next : response =>{},
        error: error =>{},
        complete: ()=>{
          this.currentPage = 1;
          this.reservations = [];
          this.loading = true;
          this.showSuccess('Book released successfully')
          this.getReservations()
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
