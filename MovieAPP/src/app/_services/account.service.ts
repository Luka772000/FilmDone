import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateUser, User } from '../_models/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  userUpFormData: UpdateUser = new UpdateUser();
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        console.log(user.roles)
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          console.log(user)
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/registerMember', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }
  update(updateForm: any) {
    return this.http.put(this.baseUrl + 'account/UpdateUser', updateForm)
  }
  register2(model1: any) {
    return this.http.post(this.baseUrl + 'account/registerModerator', model1).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);//if roles is array, set it to user.roles, otherwise push it to user.roles
    this.currentUserSource.next(user);
  }
  getId(user: User) {
    if (user) {
      const id = this.getDecodedToken(user.token).nameid; // get the id from the token  and return it
      return id;
    }
  }
  getRoles(user: User) {
    if (user) {
      const Roles: [] = this.getDecodedToken(user.token).role;
      return Roles;
    }
  }


  logout() {

    localStorage.removeItem('user');//remove the user from local storage
    this.currentUserSource.next(null);//set the current user to null
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));//decode the token and return it
  }

}
