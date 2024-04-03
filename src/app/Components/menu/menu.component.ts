import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ViewChild } from '@angular/core';
import { ContentComponent } from '../../pages/content/content.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ProductsComponent } from '../products/products.component';
import { MatDialog } from '@angular/material/dialog';


import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MaterialModule,ContentComponent, RouterModule, RouterOutlet,ProfileComponent,ProductsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',

})
export class MenuComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  userName: any;
  @Input() userDetails: any; 

  constructor(private activeRoute: ActivatedRoute, private dialog: MatDialog) {
    activeRoute.queryParams.subscribe((x: any) => this.userName = x.UserName);
  } 

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      window.location.href = '/products'; 
    }
  }
}