import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  UserData: any
  constructor(private api: ApiService, private formBilder: FormBuilder, private router: Router) {
    this.loginForm = formBilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }
  get Email() {
    return this.loginForm.get('Email')
  }

  get Password() {
    return this.loginForm.get('Password')
  }

  ngOnInit() {
  }



  login() {
    const { Email, Password } = this.loginForm.value

    const loginObj = {
      Email: Email || "",
      Password: Password || ""
    }


    this.api.post('User/Admin/Login', loginObj).subscribe({
      next:(value)=>{
        this.UserData = value
        localStorage.setItem('token', this.UserData.AccessToken)
        localStorage.setItem('_id', this.UserData._id)
        localStorage.setItem('FirstName', this.UserData.FirstName)
        localStorage.setItem('Email', this.UserData._id)
        this.router.navigate(['/Elabd/home'])
      },
      error: (msg) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Infromation Try Again',
        })
      }
   
    })
  }
}
