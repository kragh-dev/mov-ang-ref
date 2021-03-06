import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userList: User[] = [
    { username:'admin', firstName: 'Jane', lastName: '(Admin)', password:'password', role: 'Admin'},
    { username:'rhea', firstName: 'Rhea', lastName: 'Mathew', password:'password', role: 'Customer'}
  ];

  constructor() { }
  
  
  addUser(newUser:User){
    this.userList.push(newUser);
  }
  
  getUser(username:string){
    return this.userList.find(user => user.username === username );
  }

  authenticate(username: string, password: string): Observable<User> {
    return Observable.create((observer: Observer<any>) => { // temporary
      const usermatched = this.getUser(username);
      if(usermatched!=null){
      usermatched.accessToken = 'JWT-TOKEN';
      observer.next(usermatched);
    } else {
      observer.next(null);
    }
      // if (username === 'preveen') {
      //   observer.next({ username,  firstName: 'Preveen', lastName: 'Raj', role: 'Admin', accessToken: 'JWT-TOKEN' });
      // } else if(username === 'techrush') {
      //   observer.next({ username,  firstName: 'Tech', lastName: 'Rush', role: 'Customer', accessToken: 'JWT-TOKEN' });
      // } else {
      //     observer.next(null);
      // }
      return null;
    });
  }



}


