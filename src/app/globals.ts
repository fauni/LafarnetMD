import { Injectable } from '@angular/core';
import { Users } from './admin-intranet/users/users';

@Injectable()
export class Globals {
    user: Users = new Users();
/*
    urlIntranet: string = 'http://intranet.lafar.net/lafarnet/';
    urlAPI: string = 'http://intranet.lafar.net/newApiLafarnet/public/';
    //urlAPICORE: string = 'http://192.168.1.230/lafarnetservice/api/';
    urlAPICORE: string = 'http://localhost:1925/api/';
    //urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetservice/api/';
    urlAPISAP: string = 'http://190.104.26.90:8082/apilafarnet/api/';
    //urlAPISAP: string = 'http://192.168.1.230/apilafarnet/api/';
    urlImagenesPersonal: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://intranet.lafar.net/newApiLafarnet/assets/publicaciones_images/';
*/
    
    urlIntranet: string = 'http://localhost:8080/lafarnet/';
    urlAPI: string = 'http://localhost:8080/newApiLafarnet/public/';
    //urlAPICORE: string = 'http://192.168.1.230/lafarnetservice/api/';
    urlAPICORE: string = 'http://localhost:1925/api/';
    //urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetservice/api/';
    urlAPISAP: string = 'http://190.104.26.90:8082/apilafarnet/api/';
    //urlAPISAP: string = 'http://192.168.1.230/apilafarnet/api/';
    urlImagenesPersonal: string = 'http://localhost:8080/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://localhost:8080/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://localhost:8080/newApiLafarnet/assets/publicaciones_images/';
    

    urlImagesDocs: string = 'assets/images/notices/';
    urlImagenUserDefault: string = 'assets/images/usuario.jpg';
    urlImagenFirmaDefault: string = 'assets/images/firmas.jpg';
}
