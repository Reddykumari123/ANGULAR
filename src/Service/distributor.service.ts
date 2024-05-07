import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Login } from '../app/Models/Login';
import { UserDetails } from '../app/Models/user-details';


import { RXDBService } from './rxdb.service';
import { RxCollection } from 'rxdb';
import details from '../Schemas/Userdetails';


@Injectable({
  providedIn: 'root'
})
export class DistributorService {

userdetailsCollection: RxCollection<UserDetails, any, any>;

  ApiUrl = "https://localhost:44335/api/Distributor/Login";

  constructor(private httpClient: HttpClient, private rxdbService: RXDBService) {
    this.initCollections();
  }

  private async initCollections() {
    const db = await this.rxdbService.ensureIsDatabaseCreated();
    this.userdetailsCollection = (await db.addCollections({
      user: {
        schema: details
      }
    })).user;
    console.log('Collections added successfully', this.userdetailsCollection);
  }

  getData(userdetails: Login): Observable<UserDetails> {
    return this.httpClient.post<UserDetails>(this.ApiUrl, userdetails);
  }

  async saveDistributordetails(data: UserDetails) {
    
    if (this.userdetailsCollection) {

      const userdetail = await this.userdetailsCollection.findOne({ UserId: data.id }).exec();

      if (userdetail == null) {
          this.userdetailsCollection.insert(data);
          console.log('User details inserted successfully:', data);
      }
  } else {
      console.error('Userdetails collection is not initialized.');
  }
  }


}