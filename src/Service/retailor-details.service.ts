import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RetailorDetails } from '../app/Models/retailor-details';
import { ProductsByDsrId } from '../app/Models/products-by-dsr-id';

@Injectable({
  providedIn: 'root'
})
export class RetailorDetailsService {
  

  //apiUrl = "http://13.201.40.123:9999/api/Dsr/RetailorDetails";
  apiUrl = "https://localhost:44335/api/Dsr/RetailorDetails";

  //productsApiUrl = "http://13.201.40.123:9999/api/Dsrdetail?dsrId=";
  productsApiUrl = "https://localhost:44335/api/Dsrdetail?dsrId=";

 // assignedRetailorsUrl = "http://13.201.40.123:9999/api/AssignRetailorToDistributor/Details"

  assignedRetailorsUrl ="https://localhost:44335/api/AssignRetailorToDistributor/Details";





  private infoButtonClickSubject = new BehaviorSubject<RetailorDetails>(null);
   infoButtonClick = this.infoButtonClickSubject.asObservable();

  setdetails(infoButtonClickSubject: RetailorDetails) {
    this.infoButtonClickSubject.next(infoButtonClickSubject);
  }
  

  constructor(private httpClient: HttpClient) { }

  getRetailorsListById(id: any): Observable<RetailorDetails> {
    return this.httpClient.get<RetailorDetails>(`${this.apiUrl}/${id}`);
  }

  getProductsById(id: any): Observable<ProductsByDsrId> {
    return this.httpClient.get<ProductsByDsrId>(`${this.productsApiUrl}${id}`);
  }

  getRetailorsListByDate(distributorid: string, date: string): Observable<RetailorDetails[]> {
    const url = `${this.apiUrl}/${distributorid}/${date}`;
    return this.httpClient.get<RetailorDetails[]>(url);
  }
  getRetailorNames(id:any) :Observable<any>{
    return this.httpClient.get(`${this.assignedRetailorsUrl}/${id}`)
  }
}