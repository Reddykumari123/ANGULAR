import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'https://localhost:44335/api/NotificationDistributor/Notification/DistributorId';
  private exeUrl = 'https://localhost:44335/api/NotificationDistributor/Notifications/';

  constructor(private http: HttpClient) { }

  getNotificationsByDistributorId(distributorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?DistributorId=${distributorId}`);
  }

  getNotificationsByExecutiveId(executiveId: string): Observable<any> {
    return this.http.get(`${this.exeUrl}${executiveId}`);
  }

}