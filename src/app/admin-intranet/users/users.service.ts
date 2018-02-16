import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import { Globals } from '../../globals';

@Injectable()
export class UsersService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient, private global: Globals ) { }

  getUsers(): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get');
  }

  getUser(username: string): Observable<any> {
    return this.http.get(this.global.urlAPI + 'usuario/get/' + username);
  }

  setUser(data): Observable<any> {
    return this.http.post(this.global.urlAPI + 'usuario/save', data);
  }

  changePassword (data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/changePassword', data);
  }

  updateUserInformationGeneral(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateInformationGeneral', data);
  }

  updateUserInformationLaboral(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/updateInformationLaboral', data);
  }

  deleteUser(data): Observable<any> {
    return this.http.put(this.global.urlAPI + 'usuario/delete', data);
  }
}
