import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from '../app/Models/Login';
import { UserDetails } from '../app/Models/user-details';
import { RetailorDetails } from '../app/Models/retailor-details';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService {
 
  baseurl = "https://localhost:44335/api/Dsr/ExecId?ExecId=";
  private apiUrl = 'https://localhost:44335/api/Executive/Login';

  constructor(private httpClient: HttpClient) { }

  getData(userDetails: Login): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(this.apiUrl, userDetails);
  }
  getRetailorsListById(id: any): Observable<RetailorDetails> {
    return this.httpClient.get<RetailorDetails>(`${this.baseurl}${id}`);
  }
}
