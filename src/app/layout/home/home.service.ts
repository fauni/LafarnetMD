import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';

@Injectable()
export class HomeService {
  private headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  constructor(private http: HttpClient) { }

  upload(data): Observable<any> {
    //return this.http.post('http://localhost:8888/script.php', data);
    return this.http.post('http://localhost:8888/newapilafarnet/public/publicacion/upload', data);
  }

  getPublications(): Observable<any> {
    return this.http.get('http://localhost:8888/newapilafarnet/public/publicacion/get');
  }
}
