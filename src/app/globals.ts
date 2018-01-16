import { Injectable } from '@angular/core';
import { Users } from './admin-intranet/users/users';

@Injectable()
export class Globals {
    user: Users = new Users();
    urlIntranet: string = 'http://intranet.lafar.net/';
    urlAPI: string = 'http://localhost:8888/newapilafarnet/public/';
    urlImagenesPersonal:string = 'http://localhost:8888/newApiLafarnet/assets/imagenes_users/';
}