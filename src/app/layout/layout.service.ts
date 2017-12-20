import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';

@Injectable()
export class LayoutService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  AppsForUser(data): Observable<any> {
    return this.http.post('http://localhost:8888/newapilafarnet/public/usuario/apps', data);
  }

}
