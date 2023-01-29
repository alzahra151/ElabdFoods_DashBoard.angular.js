import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
user:User={}as User
constructor(private api : ApiService){}
  ngOnInit() {
this.GetUser()

  }
  GetUser(){
    const id = localStorage.getItem('_id')
    this.api.get('User/'+id).subscribe({
      next:(data)=>{
this.user=data
 
      },
      error:(err)=>{
console.log(err);

      }
      
    })
  }
}
