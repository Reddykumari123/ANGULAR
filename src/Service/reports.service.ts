import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reports } from '../app/Models/reports';
import { Observable } from 'rxjs';
import { Areas } from '../app/Models/areas';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = 'https://localhost:44335/api/DSReport';
  private AreaUrl = 'https://localhost:44335/api/Area';

  constructor(private http: HttpClient) { }

  getSalesReport(area: string, endDate: string): Observable<Reports[]> {
    return this.http.get<Reports[]>(`${this.apiUrl}?Area=${area}&EndDate=${endDate}`);
  }
  getAreas(): Observable<Areas[]> {
    return this.http.get<Areas[]>(this.AreaUrl);
  }

}
