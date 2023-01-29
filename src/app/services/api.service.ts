import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient ,private router:Router) { }

  get(path:string ,config?:object){
    return this.httpClient.get(environment.apiUrl +  path ,{
      ...config,
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.getToken()}`
      }),
     })
  }

  post(path:string,body:any,config?:object){
    return this.httpClient.post(environment.apiUrl +  path, body ,{
      ...config,
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.getToken()}`
      }),
   });
  }

  addProduct(path:string,body:any,config?:object){
    return this.httpClient.post(environment.apiUrl +  path, body ,{
      ...config,
      headers:new HttpHeaders({
        'encType':"multipart/form-data",
        'token': `token ${this.getToken()}`
      }),
   });
  }
  put(path:string,body:any,config?:object){
    return this.httpClient.put(environment.apiUrl +  path, body,{
      ...config,
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.getToken()}`
      }),
   });
  }

  delete(path:string,config?:object){
    return this.httpClient.delete(environment.apiUrl +  path,{
      ...config,
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.getToken()}`
      }),
   });
  }


  getToken(){
    return localStorage.getItem("token")
  }
}
