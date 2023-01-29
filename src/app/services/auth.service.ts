
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLogged:BehaviorSubject<Boolean>
 userInfo:User={};
 httpOptions;
userValidate=true
  constructor(private httpClient:HttpClient ,private router:Router) { 
    this.isLogged=new BehaviorSubject<Boolean>(this.isUserLogged)
   const Token =JSON.parse(localStorage.getItem('Token') || '{}')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Token': `token ${Token}`
      })
    };
  
  }
adminLogin(user:User){
 this.httpClient.post<User>(`${environment.apiUrl}/User/Login`,user).subscribe(res=>{
  localStorage.setItem('Token',JSON.stringify(res.AccessToken))
  localStorage.setItem('user',JSON.stringify(res))
  this.userInfo=res
  // this.isLogged.next(true)
  this.router.navigate(["/"]) 
 })
}
logout(userId:Number|undefined):Observable<User>{
 return   this.httpClient.get<User>(`${environment.apiUrl}/User/Logout/${userId}`,this.httpOptions)
   
}
get  isUserLogged():Boolean{
    return (localStorage.getItem('Token'))?true:false
  }

getLoggedStatus():Observable<Boolean>{
  return this.isLogged.asObservable()
}

}
