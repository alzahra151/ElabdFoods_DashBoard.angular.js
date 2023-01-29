import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts(Url:string):Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/${Url}`)
  }
}
