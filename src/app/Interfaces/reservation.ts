import { book } from "./book";
import { customer } from "./customer";

export interface reservation{
    book: book;
    customer: customer;
    reservedOn: Date;
    returnBy: Date;
    status: string;
}