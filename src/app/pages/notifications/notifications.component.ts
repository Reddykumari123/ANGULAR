import { Component } from '@angular/core';
import { NotificationsService } from '../../../Service/notifications.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: any[] = [];
  distributorId = 'NDIS16594'; 

  constructor(private notificationService:NotificationsService) { }

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications(this.distributorId).subscribe(
      (data: any[]) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

}
