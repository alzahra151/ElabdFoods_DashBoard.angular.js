import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-cat',
  templateUrl: './sub-cat.component.html',
  styleUrls: ['./sub-cat.component.scss']
})
export class SubCatComponent {

  AddSubCateForm: FormGroup;
  newSubCategory: any = {}
  deletedSubCate: any = {}
  editeSubcate: any = {}
  listOfSubcat:any=[]
   subcat={}
  constructor(private api: ApiService,private formBuilder: FormBuilder) {
    this.AddSubCateForm = formBuilder.group({
      EnsubCatName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      ArsubCatName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),

    } )  
  }
  ngOnInit() {
   
    this.getAllSubCate()
  }

 
 
  AddSubCategory() {
    
    let { ArsubCatName, EnsubCatName} = this.AddSubCateForm.value
  
    this.newSubCategory = { ArsubCatName, EnsubCatName}
    this.api.post('SubCategorie', this.newSubCategory).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'SubCategorie Added Successfully',
        })
        this.ngOnInit()

       
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })  
      }
    })
  }

  DeleteSubCate() {
    this.api.delete(`SubCategorie/${this.deletedSubCate._id}`).subscribe({
      next: (data) => {
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'SubCategorie Deleted Successfully',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })  
      }
    })
  }

  Edite(ArsubCatName: string, EnsubCatName: string) {
  
    this.editeSubcate = { ...this.editeSubcate, ArsubCatName, EnsubCatName}
    this.api.put(`SubCategorie/${this.editeSubcate._id}`, this.editeSubcate).subscribe({
      next: (data) => {
        this.ngOnInit()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'SubCategorie Deleted Successfully',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Data Try Again',
        })  
      }
    })
  }

  getAllSubCate(){
    this.api.get('SubCategorie').subscribe(data => {
      this.listOfSubcat = data
      console.log(data)
    })
  }



}