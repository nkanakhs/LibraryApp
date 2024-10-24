import { Component } from '@angular/core';
import { ReservationsService } from '../Services/reservations.service';
import { reservation } from '../Interfaces/reservation';
import { CustomDatePipe } from '../customDate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule,CustomDatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
  providers: [CustomDatePipe]
})
export class ReservationsComponent {

  loading = true;
  reservations: reservation[] = [];

  constructor(private customDatePipe: CustomDatePipe, private reservationsService: ReservationsService){

  }

  ngOnInit(){   
    this.getReservations();
  }

  getReservations (){
    this.reservationsService.getReservations().subscribe(data =>{
      this.reservations = data.map( (x: reservation) => ({
        ...x,
        reservedOn: this.customDatePipe.transform(x.reservedOn),
        returnBy: this.customDatePipe.transform(x.returnBy)
      }))
      this.loading = false
    }) 
  }
}
