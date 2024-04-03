import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../app/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 // ApiUrl="http://13.201.40.123:9999/api/Product"
 ApiUrl= "https://localhost:44335/api/Product";
 
  constructor(private httpclient: HttpClient) { }

  getProducts():Observable<Product>{
    return this.httpclient.get<Product>(this.ApiUrl);
  }
  
}
