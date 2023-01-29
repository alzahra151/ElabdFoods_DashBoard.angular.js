import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  FirstName=''
  UserID=''
  constructor(private api: ApiService,
    private router: Router,
    private httpClient: HttpClient) {
  }
  ngOnInit() {
    
    this.FirstName=localStorage.getItem('FirstName') || ''
    this.UserID=localStorage.getItem('_id') || ''

  }

  logout(){
    this.api.get(`User/Logout/${this.UserID}`).subscribe({
      next:(data)=>{
        console.log(data);
        localStorage.clear()
        this.router.navigate(['/login'])
      },
      error:(msg)=>{
        console.log(msg);
        
      }
    })
  }

}
