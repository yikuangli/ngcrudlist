import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Contact} from './contact';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      { id: 1, tel: 1234567, name: "Sop" },
      { id: 2, tel: 9823479082, name: "sadad" },
      { id: 3, tel: 12314, name: "dasdasd" },
      { id: 4, tel: 3114314, name: "dada" },
      { id: 5, tel: 12344, name: "dasdasdasd" },
      { id: 6, tel: 1234, name: "dadasgg" }
    ];
    return {contacts};
  }

    // genId(contacts: Contact[]): number {
    //   return contacts.length > 0 ? Math.max(...contacts.map(hero => hero.id)) + 1 : 11;
    // }
  }