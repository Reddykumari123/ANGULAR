import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notifications } from '../app/Models/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


ApiUrl = "https://localhost:44335/api/NotificationDistributor";
 
constructor(private httpClient: HttpClient) { }

getNotifications(): Observable<Notifications[]> {
  return this.httpClient.get<Notifications[]>(this.ApiUrl);
}
postNotification(notification: Notifications): Observable<Notifications> {
  return this.httpClient.post<Notifications>(this.ApiUrl, notification);
}
deleteNotification(id: string): Observable<any> {
  const url = `${this.ApiUrl}/${id}`;
  return this.httpClient.delete(url);
}
updateNotification(notification: Notifications): Observable<Notifications> {
  const url = `${this.ApiUrl}/${notification.id}`;
  return this.httpClient.put<Notifications>(url, notification);
}


}