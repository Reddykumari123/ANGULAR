import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ViewChild } from '@angular/core';
import { ContentComponent } from '../../pages/content/content.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ProductsComponent } from '../products/products.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


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
  showLogoutPopup: boolean = false;

  constructor(private activeRoute: ActivatedRoute, 
              private dialog: MatDialog,
              private router: Router) { 
    activeRoute.queryParams.subscribe((x: any) => this.userName = x.UserName);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openLogoutPopup() {
    this.showLogoutPopup = true;
  }

  closeLogoutPopup() {
    this.showLogoutPopup = false;
  }

  logout() {
    this.router.navigate(['/products']); 
  }
}