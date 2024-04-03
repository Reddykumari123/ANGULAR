import { Injectable } from '@angular/core';
import { UserDetails } from '../app/Models/user-details';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 

  private details = new BehaviorSubject<UserDetails>(null); 
  getdetails = this.details.asObservable();

  constructor() {}

  setdetails(details: UserDetails) {
    this.details.next(details);
  }
}



