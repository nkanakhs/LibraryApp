import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { BookService } from '../../Services/book.service';
import { book } from '../../Interfaces/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css'
})
export class ViewBookComponent {



  book !: book ;
  book_id : string = '';
  title: string = 'View Book'

  viewBookForm : FormGroup = new FormGroup ({});

  constructor(private route: ActivatedRoute, private bookService: BookService){
    this.viewBookForm = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      author: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      type: new FormControl('', Validators.required ),
      year: new FormControl('', Validators.required ),
      createdOn: new FormControl('', Validators.required )
    })
  }

  ngOnInit(){
    this.book_id = this.route.snapshot.params["id"];

    if(this.book_id){

      this.bookService.getBook(this.book_id).subscribe((data) =>{

        this.book = data;

        this.viewBookForm.controls['name'].setValue(this.book.name);
        this.viewBookForm.controls['author'].setValue(this.book.author);
        this.viewBookForm.controls['type'].setValue(this.book.type);
        this.viewBookForm.controls['year'].setValue(this.book.year);
        this.viewBookForm.controls['createdOn'].setValue(this.book.createdOn);

      })

    }

  }
}

