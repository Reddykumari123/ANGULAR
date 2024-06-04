import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private distributorApiUrl = 'https://localhost:44335/api/Notification/Notification';
  private executiveApiUrl = 'https://localhost:44335/api/Notification/Notifications';

  constructor(private http: HttpClient) { }

  getNotificationsByDistributorId(distributorId: string): Observable<any> {
    return this.http.get(`${this.distributorApiUrl}/DistributorId?DistributorId=${distributorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getNotificationsByExecutiveId(executiveId: string): Observable<any> {
    return this.http.get(`${this.executiveApiUrl}/${executiveId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
