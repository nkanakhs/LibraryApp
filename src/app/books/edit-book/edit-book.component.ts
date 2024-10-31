import { Component } from '@angular/core';
import { book } from '../../Interfaces/book';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../Services/book.service';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  book_id : string | null = null;
  book !: book;
  title : string = '';
  types = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography']
  // buttonDisabled: boolean = false;

  editbookForm : FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private bookService: BookService){
    this.editbookForm = new FormGroup({
      name: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      author: new FormControl('', [Validators.required , Validators.minLength(3), Validators.maxLength(15)]),
      available: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required ),
      year: new FormControl('', Validators.required ),
      createdOn: new FormControl('', Validators.required )
      
    });
  }

  ngOnInit() {
    
    this.book_id = this.route.snapshot.params["id"];
    
    if (this.book_id){  // we are in the edit book mode

      this.title = 'Edit book';
      this.bookService.getBook(this.book_id).subscribe((data) =>{

        this.book = data;
        
        this.editbookForm.controls['name'].setValue(this.book.name);
        this.editbookForm.controls['author'].setValue(this.book.author);
        this.editbookForm.controls['type'].setValue(this.book.type);
        this.editbookForm.controls['year'].setValue(this.book.year);
        this.editbookForm.controls['createdOn'].setValue(this.book.createdOn);
        
      })
    }else{ // add book mode
      // this.buttonDisabled = true;
      this.title = 'Add book';
    }

  }

  onSubmit(){
    
    console.log('name of the form:' +this.editbookForm.controls['name'].value)
    console.log('status of the form:' + this.editbookForm.valid )
    if(this.book_id){ //on the edit book
      if(this.editbookForm.valid){
        this.book = {
          _id: this.book_id,
          name: this.editbookForm.controls['name'].value,
          year: this.editbookForm.controls['year'].value,
          author: this.editbookForm.controls['author'].value,
          available: this.editbookForm.controls['available'].value,
          type:this.editbookForm.controls['type'].value,
          createdOn: this.editbookForm.controls['createdOn'].value
        }
        this.bookService.editBook(this.book).subscribe(data =>{
          console.log(data)
        }, error =>{
          console.log(error)
        });
      }
    }else{  //add new book
      if(this.editbookForm.valid){
        this.book = {
          name: this.editbookForm.controls['name'].value,
          year: this.editbookForm.controls['year'].value,
          author: this.editbookForm.controls['author'].value,
          available: this.editbookForm.controls['available'].value,
          type:this.editbookForm.controls['type'].value,
          createdOn: this.editbookForm.controls['createdOn'].value
        }
        this.bookService.addBook(this.book).subscribe(data =>{
          console.log(data)
        }, error =>{
          console.log(error)
        });
      }
    }
  }
}
