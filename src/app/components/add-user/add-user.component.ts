import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  AddUserForm: FormGroup

  constructor( formBulider: FormBuilder, private api: ApiService){
    this.AddUserForm = formBulider.group({
      FirstName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      LastName: (['', [Validators.required, Validators.pattern('[A-Za-z ]+')]]),
      Email: (['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]),
      MobileNumber: (['', [Validators.required,  Validators.pattern('^01[0125][0-9]{8}$')]]),
      Password: (['', [Validators.required,  Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}')]]),
      rePassword: (['', [Validators.required,  Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}')]]),
      Gender: (['', [Validators.required]]),
      IsAdmin: (['', [Validators.required]])
    })
  }
  get FirstName() {
    return this.AddUserForm.get('FirstName')
  }
  get LastName() {
    return this.AddUserForm.get('LastName')
  }
  get Email() {
    return this.AddUserForm.get('Email')
  }
  get MobileNumber() {
    return this.AddUserForm.get('MobileNumber')
  }
  get Gender() {
    return this.AddUserForm.get('Gender')
  }
  get IsAdmin() {
    return this.AddUserForm.get('IsAdmin')
  }
  get Password() {
    return this.AddUserForm.get('Password')
  }
  get rePassword() {
    return this.AddUserForm.get('rePassword')
  }

  matched():boolean{
    let {Password,rePassword} = this.AddUserForm.value
    return Password === rePassword? true : false
  }


  AddUser(){
    const {FirstName,LastName,Email,Password,MobileNumber,IsAdmin,Gender}=this.AddUserForm.value

    const RegisterObj={FirstName,LastName,Email,Password,MobileNumber,IsAdmin,Gender}

    this.api.post('User/Register',RegisterObj).subscribe({
      next:(data)=>{
        this.FirstName?.reset()  
        this.LastName?.reset()        
        this.Password?.reset()        
        this.MobileNumber?.reset()        
        this.Gender?.reset()        
        this.rePassword?.reset()   
        this.IsAdmin?.reset()        
        this.Gender?.reset() 
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'User Added Successfully',
        })
      },
      error:(err)=>{
        Swal.fire({
          icon: 'success',
          title: 'Done...',
          text: 'Incorrect Data Try Again',
        })        
      }
    })

  }
}
