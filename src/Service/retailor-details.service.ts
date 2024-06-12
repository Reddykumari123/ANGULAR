import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RetailorDetails } from '../app/Models/retailor-details';
import { ProductDetails } from '../app/Models/product-details';


@Injectable({
  providedIn: 'root'
})
export class RetailorDetailsService {
  apiUrl: string = 'https://localhost:44335/api/Dsr/RetailorDetailsbyExeOrDisId?Id=';
  productsApiUrl = 'https://localhost:44335/api/Dsr/ById/';
  assignedRetailorsbydistirbutorUrl = 'https://localhost:44335/api/AssignRetailorToDistributor/Details';
  assignedRetailorsbyexecutiveUrl = 'https://localhost:44335/api/Dsr/AssignedDetails';


  private infoButtonClickSubject = new BehaviorSubject<RetailorDetails>(null);
  infoButtonClick = this.infoButtonClickSubject.asObservable();

  setdetails(infoButtonClickSubject: RetailorDetails) {
    this.infoButtonClickSubject.next(infoButtonClickSubject);
  }

  constructor(private httpClient: HttpClient) { }


  getRetailorsListByDistributorId(id: any): Observable<RetailorDetails> {
    return this.httpClient.get<RetailorDetails>(`${this.apiUrl}${id}`);
    
  }

  getRetailorsListByExecutiveId(executiveId: any): Observable<RetailorDetails[]> {
    return this.httpClient.get<RetailorDetails[]>(`${this.apiUrl}${executiveId}`);
  }

  getProductsById(id: any): Observable<ProductDetails> {
    return this.httpClient.get<ProductDetails>(`${this.productsApiUrl}${id}`);
  }

  getRetailorsListByDate(distributorid: string, date: string): Observable<RetailorDetails[]> {
    const url = `${this.apiUrl}/${distributorid}/${date}`;
    return this.httpClient.get<RetailorDetails[]>(url);
  }

  getRetailorNamesbydistributor(id: any): Observable<any> {
    return this.httpClient.get(`${this.assignedRetailorsbydistirbutorUrl}/${id}`);
  }

  getRetailorNamesbyexecutive(id: any): Observable<any> {
    return this.httpClient.get(`${this.assignedRetailorsbyexecutiveUrl}/${id}`);
  }
}
