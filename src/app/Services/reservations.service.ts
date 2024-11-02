import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { postReservation, reservation } from '../Interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  reservationsUrl = "https://book-api-bx2r.onrender.com/reservations"

  constructor(private http: HttpClient) { }

  getReservations(): Observable<reservation[]>{
    return this.http.get<reservation[]>(this.reservationsUrl)
  }

  postReservation(reservation: postReservation): Observable<any> {
    return this.http.post(this.reservationsUrl , reservation)
  }
}
