import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent {
  listOfCategories: any = []
  AddCateForm: FormGroup;
  newCategory: any = {}
  deletedCate: any = {}
  editecate: any = {}
  listOfSubcat:any=[]
   subcat={}
  constructor(private api: ApiService,private formBuilder: FormBuilder) {
    this.AddCateForm = formBuilder.group({
      CatArName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      CatEnName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      CatArSize: (['', [Validators.required]]),
      CatEnSize: (['', [Validators.required]]),
      SubCategorieID:formBuilder.array([formBuilder.control('')])

    } )  
  }
  ngOnInit() {
    this.getAllCategories()
    this.getAllSubCate()
  }
  get CatEnSize(){
    return  this.AddCateForm.get('CatEnSize') as FormArray
   }
  get SubCategorieID(){
   return  this.AddCateForm.get('SubCategorieID') as FormArray
  }
  get CatArSize(){
    return  this.AddCateForm.get('CatArSize') as FormArray
   }
  
  addSubCate(){
    this.SubCategorieID.push(this.formBuilder.control(''));
  }
  addArSize(){
    this.CatArSize.push(this.formBuilder.control(''));
  }
  addEnSize(){
    this.CatEnSize.push(this.formBuilder.control(''));
  }
  getAllCategories() {
    this.api.get('Categorie').subscribe(data => {
      this.listOfCategories = data
      console.log(data)
    })
  }
  AddCategory() {
    
    let { CatArName, CatEnName, CatArSize, CatEnSize ,SubCategorieID} = this.AddCateForm.value
    SubCategorieID={
      "SubCat":SubCategorieID
    }
    this.newCategory = { CatArName, CatEnName, CatArSize, CatEnSize ,SubCategorieID}
    console.log(   this.newCategory)
    this.api.post('Categorie', this.newCategory).subscribe({
      next: (data) => {
       
        this. ngOnInit()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Categorie Added Successfully',
        })
       
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Infromation Try Again',
        })
      }
    })
  }

  DeleteCate() {
    this.api.delete(`Categorie/${this.deletedCate._id}`).subscribe({
      next: (data) => {
        this.getAllCategories()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Categorie Deleted Successfully',
        })

      },
      error: (err) => {
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Server Have Some issues Try again Later',
        })
      }
    })
  }

  Edite(CatArName: string, CatEnName: string, CatArSize: string, CatEnSize: string) {
  
    this.editecate = { ...this.editecate, CatArName, CatEnName, CatArSize, CatEnSize }
    this.api.put(`Categorie/${this.editecate._id}`, this.editecate).subscribe({
      next: (data) => {
        this.getAllCategories()
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Categorie Edited Successfully',
        })
      },
      error: (err) => {
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Incorrect Infromation Try Again',
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