import { ListService, PagedResultDto, PagedResultRequestDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService,BookDto, bookTypeOptions, BookType } from '@proxy/books';
import {NgbDateAdapter,NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers:[ListService,
    {provide:NgbDateAdapter,useClass:NgbDateNativeAdapter}],
  
})
export class BookComponent implements OnInit {
book={items:[],totalCount:0} as PagedResultDto<BookDto>;
form:FormGroup; 


public bookTypes=bookTypeOptions;

isModelOpen= false;

constructor
  (
  public readonly listService: ListService,
  private bookService: BookService,
  private fb:FormBuilder //inject formBuilder
  ) {}

  ngOnInit(): void {
  
    const bookStreamCreator=(query)=>this.bookService.getList(query);
    this.listService.hookToQuery(bookStreamCreator).subscribe((responce)=>{
    this.book=responce;
    console.log(responce);
    });
  }
  createBook() {
    this.isModelOpen=true;
    this.buildForm();
    console.log("Wawa");
  }
  buildForm() {
    this.form=this.fb.group({
   // name:['',Validators.required],
    //type:[null,Validators.required],
    //publishDate:[null,Validators.required],
    //price:[null,Validators.required]


    name:['',Validators.required],
    type:[null,Validators.required],
    publishDate:[null,Validators.required],
    price:[null,Validators.required]





    });
  }
  save(){
    if (this.form.invalid) {
      return;
    }
    this.bookService.create(this.form.value).subscribe(()=>{
    this.isModelOpen=false;
    this.form.reset;
    this.listService.get();
    });
  }

}
