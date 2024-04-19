import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { RetailorDetails } from '../app/Models/retailor-details';
import { ProductsByDsrId } from '../app/Models/products-by-dsr-id';

@Injectable({
  providedIn: 'root'
})
export class RetailorDetailsService {
  

  apiUrl = "https://localhost:44335/api/Dsr/RetailorDetails";

  productsApiUrl = "https://localhost:44335/api/Dsrdetail?dsrId=";

  assignedRetailorsbydistirbutorUrl ="https://localhost:44335/api/AssignRetailorToDistributor/Details";

  baseurl = "https://localhost:44335/api/Dsr/RetailorDetailsbyExe";

  assignedRetailorsbyexecutiveUrl:"https://localhost:44335/api/AssignDistributorToExecutive/Details";

  


  private infoButtonClickSubject = new BehaviorSubject<RetailorDetails>(null);
   infoButtonClick = this.infoButtonClickSubject.asObservable();

  setdetails(infoButtonClickSubject: RetailorDetails) {
    this.infoButtonClickSubject.next(infoButtonClickSubject);
  }
  
  constructor(private httpClient: HttpClient) { }

  getRetailorsListByDistributorId(id: any): Observable<RetailorDetails> {
    return this.httpClient.get<RetailorDetails>(`${this.apiUrl}/${id}`);
  }
  

  getRetailorsListByExecutiveId(executiveId: any): Observable<RetailorDetails[]> {
    return this.httpClient.get<RetailorDetails[]>(`${this.baseurl}/${executiveId}`);
  }

  getProductsById(id: any): Observable<ProductsByDsrId> {
    return this.httpClient.get<ProductsByDsrId>(`${this.productsApiUrl}${id}`);
  }

  getRetailorsListByDate(distributorid: string, date: string): Observable<RetailorDetails[]> {
    const url = `${this.apiUrl}/${distributorid}/${date}`;
    return this.httpClient.get<RetailorDetails[]>(url);
  }
  getRetailorNamesbydistributor(id:any) :Observable<any>{
    return this.httpClient.get(`${this. assignedRetailorsbydistirbutorUrl}/${id}`)
  }
  getRetailorNamesbyexecutive(Id: any): Observable<any> {
    return this.httpClient.get(`${this.assignedRetailorsbyexecutiveUrl}/${Id}`);
  }
  
  
  
}