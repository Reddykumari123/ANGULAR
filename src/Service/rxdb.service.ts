import { Injectable } from '@angular/core';
import { RxCollection, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';


@Injectable({
  providedIn: 'root'
})
export class RXDBService {

  constructor() { }

    db:RxDatabase |null = null;
    
    public async ensureIsDatabaseCreated(){
      
        this.db = await createRxDatabase({
            name: 'naturaldb',
            storage: getRxStorageDexie(),
            ignoreDuplicate: true 
        });
        console.log('database is successfully created');
        return this.db;
      }
    
}
