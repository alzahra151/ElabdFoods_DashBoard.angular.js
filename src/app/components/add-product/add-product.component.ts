import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from 'src/app/models/product';
import { ApiService } from 'src/app/services/api.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  AddProductForm: FormGroup
  ExcelData: any
  listOfCat: any
  listOfSubcat: any
  newProduct: Product = {} as Product
  AvailableSelectSubCat = true
  ImageFile: any
  sublist: any
  avilable = true

  constructor(formBulider: FormBuilder, private api: ApiService) {
    this.AddProductForm = formBulider.group({

      EnName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      ArName: (['', [Validators.required, Validators.pattern('[\u0621-\u064A ]+')]]),
      Image: (['', [Validators.required]]),
      Price: (['', [Validators.required, Validators.pattern('[0-9]+')]]),
      Amount: (['', [Validators.required, Validators.pattern('[0-9]+')]]),
      CategorieID: (['', [Validators.required]]),
      SubCategID: (['', [Validators.required]])

    })

  }



  get EnName() {
    return this.AddProductForm.get('EnName')
  }
  get ArName() {
    return this.AddProductForm.get('ArName')
  }
  get Image() {
    return this.AddProductForm.get('Image')
  }
  get Price() {
    return this.AddProductForm.get('Price')
  }
  get CategorieID() {
    return this.AddProductForm.get('CategorieID')
  }
  get SubCategID() {
    return this.AddProductForm.get('SubCategID')
  }
  get Amount() {
    return this.AddProductForm.get('Amount')
  }
  readExcel(event: any) {
    let file = event.target.files[0]
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' })
      var sheetNames = workBook.SheetNames
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]])
    }
  }


  AddProductExcel() {
    if (this.ExcelData) {
      for (const item of this.ExcelData) {
        const product = {
          EnName: item.EnName,
          ArName: item.ArName,
          Image: {
            url: item.Image
          },
          Amount: item.Amount,
          Price: item.Price,
          CategorieID: this.listOfCat.find((data: any) => {
            return item.CategorieID === data.CatEnName
          })?._id,
          SubCategID: this.sublist.find((data: any) => {
            return data.EnsubCatName === item.SubCategorieID
          })?._id
        }
        this.api.post('Product', product).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: 'Done...',
              text: 'Product Added Successfully',
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
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Upload File First',
      })
    }

  }
  ngOnInit(): void {
    this.GetAllCat()
    this.GetSubCat()
  }
  GetAllCat() {
    this.api.get('Categorie').subscribe({
      next: (data) => {
        this.listOfCat = data


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  GetAllSubCat(id: string) {
    const selectCat = this.listOfCat.filter((item: any) => item._id === id)
    this.listOfSubcat = selectCat[0].SubCategorieID
  }

  GetSubCat() {
    this.api.get('SubCategorie').subscribe({
      next: (data) => {
        this.sublist = data


      },
      error: (err) => {
        console.log(err);

      }
    })

  }
  AddProduct() {
    let { EnName, ArName, Price, CategorieID, SubCategID, Amount } = this.AddProductForm.value
    let Product = new FormData()
    if (SubCategID === '') {
      Product.append("EnName", EnName)
      Product.append("ArName", ArName)
      Product.append("Price", Price)
      Product.append("CategorieID", CategorieID)
      Product.append("Amount", Amount)
      Product.append("Image", this.ImageFile)
    }
    else {
      Product.append("SubCategID", SubCategID)
      Product.append("EnName", EnName)
      Product.append("ArName", ArName)
      Product.append("Price", Price)
      Product.append("CategorieID", CategorieID)
      Product.append("Amount", Amount)
      Product.append("Image", this.ImageFile)
    }
    this.api.addProduct('Product/UploadProduct', Product).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Products Added Successfully',
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
  SelectSubCat(event: any) {
    let id = event.target.value
    this.GetAllSubCat(id)

  }

  OnUpload(event: any) {
    this.ImageFile = event.target.files[0]

  }
}
