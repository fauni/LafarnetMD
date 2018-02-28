import { Injectable } from '@angular/core';
import { Users } from './admin-intranet/users/users';

@Injectable()
export class Globals {
    user: Users = new Users();
    urlIntranet: string = 'http://intranet.lafar.net/';
    //urlIntranet: string = 'http://192.168.1.213/';

    //urlAPI: string = 'http://intranet.lafar.net:8080/newApiLafarnet/public/';
    //urlImagenesPersonal: string = 'http://intranet.lafar.net:8080/newApiLafarnet/assets/imagenes_users/';
    //urlPublicaciones: string = 'http://intranet.lafar.net:8080/newApiLafarnet/assets/publicaciones_images/';

    urlAPI: string = 'http://192.168.2.232/newapilafarnet/public/';
    urlImagenesPersonal: string = 'http://192.168.2.232/newApiLafarnet/assets/imagenes_users/';
    urlPublicaciones: string = 'http://192.168.2.232/newapilafarnet/assets/publicaciones_images/';

    //urlAPI: string = 'http://intranet.lafar.net/newapilafarnet/public/';
    //urlImagenesPersonal: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_users/';
    //urlPublicaciones: string = 'http://intranet.lafar.net/newapilafarnet/assets/publicaciones_images/';

    //urlAPI: string = 'http://192.168.1.213/newApiLafarnet/public/';
    //urlImagenesPersonal: string = 'http://192.168.1.213/newApiLafarnet/assets/imagenes_users/';
    //urlPublicaciones: string = 'http://192.168.1.213/newApiLafarnet/assets/publicaciones_images/';

    urlImagesDocs: string = 'assets/images/notices/';
    urlImagenUserDefault: string = 'assets/images/usuario.jpg';

}