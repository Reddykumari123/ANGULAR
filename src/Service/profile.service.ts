import { Injectable } from '@angular/core';
import { UserDetails } from '../app/Models/user-details';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
 

  private userDetailsSubject = new BehaviorSubject<UserDetails>(null);
  userDetails$ = this.userDetailsSubject.asObservable();

  constructor() { }

  setUserDetails(userDetails: UserDetails) {
    this.userDetailsSubject.next(userDetails);
  }

  getUserDetails(): Observable<UserDetails> {
    return this.userDetailsSubject.asObservable();
  }

}



