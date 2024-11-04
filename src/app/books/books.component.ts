import { Component, inject } from '@angular/core';
import { BookService } from '../Services/book.service';
import { book } from '../Interfaces/book';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CustomDatePipe } from '../customDate.pipe';
import { RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { MatFormField } from '@angular/material/form-field';
import { FormControl, FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule,CustomDatePipe,RouterLink,MatFormField,MatIcon,ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [CustomDatePipe]
})
export class BooksComponent {

  books : book[] = [];
  loading = true;
  searchTerm = '';
  sortTerm= '';
  filteredbooks: book[] = [];
  modalService = inject(NgbModal);
  searchBookForm : FormGroup = new FormGroup({});
  searchSub ?: Subscription;
  sortSub ?: Subscription;

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private customDatePipe: CustomDatePipe, private bookService: BookService,private snackBar: MatSnackBar){
    this.searchBookForm = new FormGroup({
      searchTerm: new FormControl(''),
      sortTerm: new FormControl(''),
    })

    this.searchSub = this.searchBookForm.get('searchTerm')?.valueChanges.subscribe(() =>{
      this.onSubmit()
    })

    this.sortSub = this.searchBookForm.get('sortTerm')?.valueChanges.subscribe(() =>{
      this.onSubmit()
    })
  }

  ngOnInit(){
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (data: book[]) => {
        this.books = data.map(x => ({
          ...x,
          createdOn: this.customDatePipe.transform(x.createdOn)
        }))
        this.loading = false
      });
  }

  deleteBook(book : book){
    this.bookService.deleteBook(book).subscribe({
      next: response => console.log(response),
      error: error => console.log(error),
      complete: () => {
        this.showSuccess('Book deleted successfully')
        this.loading = true
        this.bookService.getBooks().subscribe(
          (data: book[]) => {
            this.books = data.map(x => ({
              ...x,
              createdOn: this.customDatePipe.transform(x.createdOn)
            }))
            this.loading = false
          });
      }
    })
  }

  onSubmit() {
    this.searchTerm = this.searchBookForm.controls['searchTerm'].value
    this.sortTerm = this.searchBookForm.controls['sortTerm'].value
    this.bookService.getBooksWithParams(this.searchTerm,this.sortTerm).subscribe({
      next: response => (this.books = response.map(x => ({
        ...x,
        createdOn: this.customDatePipe.transform(x.createdOn)
      })))
    })
    // client side
    // this.bookService.getBooks().subscribe({
    //   next: response => {
    //     this.books = response.filter( book => book.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    //     )
    //   },
    //   complete: () =>
    //     console.log(this.books)
    // })
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  openConfirmModal(book: book) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.result.then(
      (result) => {
        this.deleteBook(book)
        //console.log('Modal closed with:', result);
      },
      (reason) => {
        // console.log('Modal dismissed with:', reason);
      }
    );
  }

  // Method to get the books for the current page
  get paginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.books.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method to go to the next page
  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.books.length) {
      this.currentPage++;
    }
  }

  // Method to go to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onDestroy(){
    this.sortSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

}
