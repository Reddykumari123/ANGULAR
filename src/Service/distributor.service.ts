import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../app/Models/Login';
import { UserDetails } from '../app/Models/user-details';
@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  //ApiUrl = "http://13.201.40.123:9999/api/Distributor/Login";
  ApiUrl = "https://localhost:44335/api/Distributor/Login";


  constructor(private httpClient: HttpClient) { 

  }
  getData(userdetails: Login):Observable<UserDetails>{
    return this.httpClient.post<UserDetails>(this.ApiUrl, userdetails) ;
  }

}



 
  