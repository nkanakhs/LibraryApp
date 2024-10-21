import { Component } from '@angular/core';
import { ReservationsService } from '../Services/reservations.service';
import { reservation } from '../Interfaces/reservation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  loading = true;
  reservations: reservation[] = [];

  constructor(private reservationsService: ReservationsService){

  }

  ngOnInit(){   
    this.getReservations();
  }

  getReservations (){
    this.reservationsService.getReservations().subscribe(data =>{
      data.forEach( x => {
        this.reservations.push(x)
      })
      this.loading = false
    }) 
  }
}
