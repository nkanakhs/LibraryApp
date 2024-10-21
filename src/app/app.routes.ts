import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BooksComponent } from './books/books.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CustomersComponent } from './customers/customers.component';

export const routes: Routes = [
    {path: '' , component: WrapperComponent },
    {path: 'home' , component: HomepageComponent },
    {path: 'books' , component: BooksComponent },
    {path: 'reservations' , component: ReservationsComponent },
    {path: 'customers' , component: CustomersComponent },
];
