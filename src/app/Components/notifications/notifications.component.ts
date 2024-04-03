import { Component, OnInit } from '@angular/core';
import { Notifications } from '../../Models/notifications';
import { NotificationService } from '../../../Service/notification.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  notifications: Notifications[];
  newSubject: string;
  newBody: string;
  showInputs: boolean = false;
  editing: boolean = false;
  selectedNotification: Notifications;


  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (data: Notifications[]) => {
        this.notifications = data;
      },
      error => {
        console.log('Error fetching notifications:', error);
      }
    );
  }
  postNotification(): void {
    const newId: string = this.generateUniqueId();
      const newNotification: Notifications = new Notifications(newId, this.newSubject, this.newBody);
      this.notificationService.postNotification(newNotification).subscribe(
      (data: Notifications) => {
        this.getNotifications();
        this.newSubject = '';
        this.newBody = '';
      },
      error => {
        console.log('Error posting notification:', error);
      }
    );
  }
  
  generateUniqueId(): string {
    return 'new_id_' + Date.now();
  }
  
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }

  deleteNotification(id: string): void {
    if (confirm('Are you sure you want to delete this notification?')) {
      this.notificationService.deleteNotification(id).subscribe(
        () => {
          this.notifications = this.notifications.filter(notification => notification.id !== id);
        },
        error => {
          console.log('Error deleting notification:', error);
        }
      );
    }
  }
  editNotification(notification: Notifications): void {
    this.selectedNotification = { ...notification };
    this.editing = true;
  }
  
  saveChanges(): void {
    this.notificationService.updateNotification(this.selectedNotification).subscribe(
      () => {
        const index = this.notifications.findIndex(notification => notification.id === this.selectedNotification.id);
        if (index !== -1) {
          this.notifications[index] = { ...this.selectedNotification };
        }
        this.cancelEdit();
      },
      error => {
        console.log('Error updating notification:', error);
      }
    );
  }
  
  cancelEdit(): void {
    this.selectedNotification = null;
    this.editing = false;
  }
}
