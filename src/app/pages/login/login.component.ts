import { Component, ElementRef, ViewChild } from '@angular/core';
import { DistributorService } from '../../../Service/distributor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ExecutiveService } from '../../../Service/executive.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { UserDetails } from '../../Models/user-details';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileService } from '../../../Service/profile.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('Username')
  userName!: ElementRef;

  userDetails: UserDetails;
  name: any;
  public showPassword: boolean = false;

  invalidCredentials: boolean = false;
  isLoading: boolean = false;

  constructor(
    private distributorService: DistributorService,
    private route: ActivatedRoute,
    private executiveService: ExecutiveService,
    private profileService: ProfileService,
    private router: Router
  ) {
    route.queryParams.subscribe((x: any) => this.name = x.name);
  }

  onSubmit(userdetails: NgForm) {
    this.isLoading = true;
    if (this.name === 'DISTRIBUTOR') {
      this.distributorService.getData(userdetails.value).subscribe({
        next: (userdetails) => {
          this.handleLogin(userdetails, 'DISTRIBUTOR');
        },
        error: (err) => {
          this.handleLoginError();
        }
      });
    } else if (this.name === 'EXECUTIVE') {
      this.executiveService.getData(userdetails.value).subscribe({
        next: (userdetails) => {
          this.handleLogin(userdetails, 'EXECUTIVE');
        },
        error: (err) => {
          this.handleLoginError();
        }
      });
    }
  }

  handleLogin(userdetails: UserDetails, role: string) {
    this.userDetails = userdetails;
    this.profileService.setdetails(this.userDetails);
    if (role === 'DISTRIBUTOR') {
      this.router.navigate(['/Menu'], { queryParams: { distributorId: this.userDetails.id, UserName: this.userName.nativeElement.value } });
    } else if (role === 'EXECUTIVE') {
      this.router.navigate(['/Menu'], { queryParams: { ExecutiveId: this.userDetails.id, UserName: this.userName.nativeElement.value } });
    }
  }

  handleLoginError() {
    this.invalidCredentials = true;
    this.isLoading = false;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  closePopupWindow() {
    this.invalidCredentials = false;
  }

}
