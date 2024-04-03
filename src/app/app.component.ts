import { Component, OnInit } from '@angular/core';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { ProfileComponent } from './Components/profile/profile.component';
// import { AddDsrComponent } from './pages/add-dsr/add-dsr.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, HeaderComponent, FooterComponent, RouterOutlet, RouterModule, MenuComponent,ProfileComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'natural-angular-app';

}
