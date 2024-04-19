import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './Components/menu/menu.component';
import { Routes } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AddDsrComponent } from './pages/add-dsr/add-dsr.component';
import { RetailorDetailsComponent } from './pages/retailor-details/retailor-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';



export const routes: Routes = 
[
    { path: '', component: ProductsComponent },
    { path: 'Home', component: HomeComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'Profile', component: ProfileComponent },
    {
        path: 'Menu',
        component: MenuComponent,
        children: [
          { path: '', component: ContentComponent },
          { path: 'CreateDSR/:id', component: AddDsrComponent }, 
        ]
      },
      
    { path: 'RetailorDetails', component: RetailorDetailsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/Home', component: HomeComponent },
    {path:'notifications',component:NotificationsComponent}
 

];


