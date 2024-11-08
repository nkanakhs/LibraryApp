import {Component, inject} from '@angular/core';
import {book} from '../../Interfaces/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../Services/book.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatSelect, MatOption, MatIcon, MatLabel,  NgForOf, NgClass],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  isDisabled: boolean = false;


  book_id: string | null = null;
  book !: book;
  title: string = '';
  types = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography']
  // buttonDisabled: boolean = false;

  editbookForm: FormGroup = new FormGroup({});


  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router, private snackBar: MatSnackBar) {
    this.editbookForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      author: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      type: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      createdOn: new FormControl('', Validators.required)

    });
  }


  ngOnInit() {

    this.book_id = this.route.snapshot.params["id"];
    const now = new Date();

    if (this.book_id) {  // we are in the edit book mode

      this.title = 'Edit book';
      this.bookService.getBook(this.book_id).subscribe((data) => {

        this.book = data;

        this.editbookForm.controls['name'].setValue(this.book.name);
        this.editbookForm.controls['author'].setValue(this.book.author);
        this.editbookForm.controls['type'].setValue(this.book.type);
        this.editbookForm.controls['year'].setValue(this.book.year);
        this.editbookForm.controls['createdOn'].setValue(now);

      })
    } else { // add book mode
      this.editbookForm.controls['createdOn'].setValue(now);
      this.title = 'Add book';
    }

  }

  onSubmit() {

    if (this.book_id) { //on the edit book
      if (this.editbookForm.valid) {
        this.book = {
          _id: this.book_id,
          name: this.editbookForm.controls['name'].value,
          year: this.editbookForm.controls['year'].value,
          author: this.editbookForm.controls['author'].value,
          type: this.editbookForm.controls['type'].value,
          createdOn: this.editbookForm.controls['createdOn'].value
        }
        this.bookService.editBook(this.book).subscribe({
          next: response => {
            console.log(response)
          },
          error: error => {
            console.log(error)
          },
          complete: () => {
            this.showSuccess('Book edited successfully')
            this.router.navigate(['/books'])
          }
        });
      }
    } else {  //add new book
      if (this.editbookForm.valid) {
        this.book = {
          name: this.editbookForm.controls['name'].value,
          year: this.editbookForm.controls['year'].value,
          author: this.editbookForm.controls['author'].value,
          type: this.editbookForm.controls['type'].value,
          createdOn: this.editbookForm.controls['createdOn'].value
        }
        this.bookService.addBook(this.book).subscribe({
          next: response => {
            //console.log(response)
          },
          error: error => {
            //console.log(error)
          },
          complete: () => {
            this.showSuccess('Book added successfully')
            this.router.navigate(['/books'])
          }
        });
      }
    }
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

