import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, Validators, NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { AlertsService, AlertType } from '@jaspero/ng2-alerts';
import { MzButtonModule, MzInputModule, MzModalService } from 'ng2-materialize';
import { Globals } from '../globals';
import { LoginService } from '../login/login.service';
import { UsersService } from '../admin-intranet/users/users.service';
import { Users } from '../admin-intranet/users/users';

@Component({
    selector: 'app-restorepass',
    templateUrl: './restorepass.component.html',
    styleUrls: ['./restorepass.component.scss']
})

export class RestorePassComponent implements OnInit {
    email_address: string;
    datos: any;
    user: Users;
    username: String;
    password: String;
    confirmPassword: String;

    errorMessages = {
        email_address: {
            required: 'Correo no valido',
            email: ' (ejemplo@lafar.net)'
        },
        password: {
            required: 'Contraseña Requerida'
        },
        confirmPassword: {
            required: 'Este campo es requerido'
        }
    };

    constructor(
        private route: ActivatedRoute,
        public servLogin: LoginService,
        public servUser: UsersService
    ) {
        this.email_address = '';
        this.password = '';
        this.confirmPassword = '';
    }

    ngOnInit(): void {
        this.abrirLoader();
        this.route.params
            .subscribe(params => {
                this.username = params['id'].toString();
                this.onLoadUser(this.username);
            });
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

    }

    onSendEmail() {
        this.datos = {'email_address': this.email_address };
        this.servLogin.sendEmail(this.datos).subscribe(
            data => {
                console.log(data['body']);
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

    onLoadUser(username): void {
        this.user = new Users();
        this.servUser.getUser(username).subscribe(
            data => {
                console.log(data);
                this.user = data.body[0];
                console.log(this.user);
                this.email_address = this.user.email_address;
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
}
