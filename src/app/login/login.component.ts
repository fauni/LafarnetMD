import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from './login';
import { Usuario } from '../models/usuario';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';
import { MzButtonModule, MzInputModule, MzModalService } from 'ng2-materialize';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    @ViewChild('form') form: FormGroup;
    submitted = false;
    submittedValues: any;
    returnUrl: string;
    model: any = {};
    usuario: Usuario;
    login: Login;

    errorMessages = {
        username: {
            required: 'Nombre de Usuario requerido'
        },
        password: {
            required: 'La contraseña es requerida'
        }
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private srvLogin: LoginService,
        private _service: NotificationsService,
        private _serviceAlert: AlertsService,
        private _modalService: MzModalService
    ) {
    }


    open2(type: AlertType) {
        this._serviceAlert.create(type, 'This is a message');
    }

    open() {
        this._service.success(
            'Some Title',
            'Some Content',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
            }
        );
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['home'] || '/';
        this.abrirLoader();
    }

    onLoggedin() {
        this.openLoading();
        this.onSubmit();
        this.login = new Login(this.model.username, this.model.password);
        this.srvLogin.login(this.login).subscribe(
            data => {
                this.closeLoading();
                if (data.length > 0) {
                    this.usuario = data.body;
                    if (this.usuario[0].status == 'live') {
                        console.log("Bienvenido a Lafarnet");
                        this._service.success(
                            'Acceso Correcto!',
                            'Bienvenido a Lafarnet',
                            {
                                timeOut: 2000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                        localStorage.setItem('isLoggedin', 'true');
                        this.router.navigate([this.returnUrl]);
                    } else if (this.usuario[0].status == 'suspended') {
                        console.log("Su cuenta se encuentra bloqueada");
                        this._service.warn(
                            'Acceso no autorizado',
                            'Su cuenta se encuentra Bloqueada',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                    } else if (this.usuario[0].status == 'pending') {
                        console.log("Su cuenta no ha sido activada o habilitada consulte al Adminstrador");
                        this._service.info(
                            'Acceso no autorizado',
                            'Comuniquese con el Administrador',
                            {
                                timeOut: 3000,
                                showProgressBar: true,
                                pauseOnHover: false,
                                clickToClose: false,
                                maxLength: 10
                            }
                        );
                    }
                }else {
                    console.log('Usuario o Contraseña Incorrecta');
                    this._service.error(
                        'Error de Autenticación!',
                        'Usuario o Clave Incorrecta',
                        {
                            timeOut: 3000,
                            showProgressBar: true,
                            pauseOnHover: false,
                            clickToClose: false,
                            maxLength: 10
                        }
                    );
                }

            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('Ocurrio un error:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
              }
            }
        );
    }

    cargarUsuarios(): void {
        this.srvLogin.getUsuarios().subscribe(
            data => {
                console.log(data['body']);
                this.usuario = data.body;
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              }
            }
        );
    }

    openLoading() {
        const loading = $('#loading');
        loading.fadeIn();
    }

    closeLoading() {
        const loading = $('#loading');
        loading.fadeOut();
    }

    abrirLoader() {
        const loader =  $('body');
        setTimeout(function(){
            loader.addClass('loaded');
        }, 200);
    }

    onSubmit() {
        this.submitted = true;
        this.submittedValues = this.form.value;
    }
}
