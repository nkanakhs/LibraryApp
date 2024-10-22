import {Routes} from '@angular/router';
import {WrapperComponent} from './wrapper/wrapper.component';
import {BooksComponent} from './books/books.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {CustomersComponent} from './customers/customers.component';
import {EditReservationsComponent} from './reservations/edit-reservations/edit-reservations.component';
import {ViewReservationsComponent} from './reservations/view-reservations/view-reservations.component';
import {EditCustomersComponent} from './customers/edit-customers/edit-customers.component';
import {ViewCustomersComponent} from './customers/view-customers/view-customers.component';
import {EditBookComponent} from './books/edit-book/edit-book.component';
import {ViewBookComponent} from './books/view-book/view-book.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomepageComponent} from './homepage/homepage.component';

export const routes: Routes = [
  {path: '', component: WrapperComponent},


  {path: 'home', component: HomepageComponent},


  {
    path: 'books', component: BooksComponent,
    children: [
      {path: "edit-books", component: EditBookComponent},
      {path: "view-books", component: ViewBookComponent},

    ]
  },

  {
    path: 'reservations', component: ReservationsComponent,
    children: [
      {path: "edit-reservations", component: EditReservationsComponent},
      {path: "view-reservations", component: ViewReservationsComponent},
    ]
  },

  {
    path: 'customers', component: CustomersComponent,
    children: [
      {path: "edit-customers", component: EditCustomersComponent},
      {path: "view-customers", component: ViewCustomersComponent},
    ]
  },

  {path: '**', component: PageNotFoundComponent},
];
