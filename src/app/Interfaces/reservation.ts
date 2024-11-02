import { book } from "./book";
import { customer } from "./customer";

export interface reservation{
    _id?: string;
    customer: customer;
    book: book;
    reservedOn: Date;
    returnBy: Date;
    status: string;
}

export interface postReservation{
    customer_id: string;
    book_id: string;
    returnBy: Date;
}