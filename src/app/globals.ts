import { Injectable } from '@angular/core';
import { Users } from './admin-intranet/users/users';

@Injectable()
export class Globals {
    user: Users = new Users();
    urlIntranet: string = 'http://intranet.lafar.net/';
    urlAPI: string = 'http://localhost/newapilafarnet/public/';
    urlImagenesPersonal: string = 'http://localhost/newApiLafarnet/assets/imagenes_users/';
    //urlImagesDocs: string = 'assets/images/notices/';
    urlPublicaciones: string = 'http://localhost/newapilafarnet/assets/publicaciones_images/';

    //urlAPI: string = 'http://intranet.lafar.net/newapilafarnet/public/';
    //urlImagenesPersonal: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_users/';
    urlImagesDocs: string = 'assets/images/notices/';
    urlImagenUserDefault: string = 'assets/images/usuario.jpg';
    //urlPublicaciones: string = 'http://intranet.lafar.net/newapilafarnet/assets/publicaciones_images/';
}