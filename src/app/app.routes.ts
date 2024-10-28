import {Routes} from '@angular/router';
import {WrapperComponent} from './wrapper/wrapper.component';
import {BooksComponent} from './books/books.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {CustomersComponent} from './customers/customers.component';
import {EditReservationsComponent} from './reservations/edit-reservation/edit-reservations.component';
import {ViewReservationsComponent} from './reservations/view-reservation/view-reservations.component';
import {EditCustomersComponent} from './customers/edit-customer/edit-customers.component';
import {ViewCustomersComponent} from './customers/view-customer/view-customers.component';
import {EditBookComponent} from './books/edit-book/edit-book.component';
import {ViewBookComponent} from './books/view-book/view-book.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomepageComponent} from './homepage/homepage.component';

export const routes: Routes = [
  {path: '', component: WrapperComponent},


  {path: 'home', component: HomepageComponent},


  {path: 'books', component: BooksComponent, },
  
  {path: "books/view-books/:id", component: ViewBookComponent},
  {path: "books/edit-books/:id", component: EditBookComponent},

  {
    path: 'reservations', component: ReservationsComponent,
    children: [
      {path: "edit-reservation", component: EditReservationsComponent},
      {path: "view-reservation", component: ViewReservationsComponent},
    ]
  },

  {path: 'customers', component: CustomersComponent},
  {path: 'customers/edit-customer/:id', component: EditCustomersComponent},
  {path: 'customers/add-customer', component: EditCustomersComponent},
  {path: 'customers/view-customer/:id', component: ViewCustomersComponent},

  {path: '**', component: PageNotFoundComponent},
];
