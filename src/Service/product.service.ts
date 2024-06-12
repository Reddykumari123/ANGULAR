import { HttpClient } from "@angular/common/http";
import { Product } from "../app/Models/product";
import { RXDBService } from "./rxdb.service";
import { RxCollection } from "rxdb";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import allProducts from "../Schemas/Products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  allProductsCollection: RxCollection<Product, any, any>;

  ApiUrl = "https://localhost:44335/api/Product";

  constructor(private httpclient: HttpClient, private rxdbService: RXDBService) { 
    this.initCollections();
  }

  getProducts(): Observable<Product[]> {
    return this.httpclient.get<Product[]>(this.ApiUrl);
  }
  
  private async initCollections() {
    try {
      const db = await this.rxdbService.ensureIsDatabaseCreated();
      this.allProductsCollection = (await this.rxdbService.db.addCollections({
        Products: {
          schema: allProducts,
        }
      })).Products;
    } catch (error) {
      console.error('Error initializing collections:', error);
    }
  }

  async saveProducts(data: Product[]) {
    try {
      await this.allProductsCollection.insert(data);
    } catch (error) {
      console.error('Error saving products:', error);
    }
  }

  private details = new BehaviorSubject<Product[]>(null); 
  getdetails = this.details.asObservable();
  
  DisplaySelectedProducts(product:Product[]){
    this.details.next(product);
    
  }
}
