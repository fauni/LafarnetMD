import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../../../globals';
import { Clasificacion } from '../clasificacion';
import { ClasificacionService } from '../clasificacion.service';
import { ClasificacionCaracteristica } from './clasisficacion_caracteristica';
import { ClasificacionCaracteristicaService} from './clasificacion_caracteristica.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Caracteristicas } from '../caracteristicas';
import {Caracteristicasfisicas } from '../caracteristicasfisicas';
import { CaracteristicasService } from '../caracteristicas.service';

@Component({
  selector: 'app-asignacionparm',
  templateUrl: './asignacionparm.component.html',
  styleUrls: ['./asignacionparm.component.scss']
})
export class AsignacionparmComponent implements OnInit {

    public swich = 0 ; // verificacion en la llamada a la funcion onclick
    public tipo_producto = '1'; // para el radio button, puede ser 1 = MP:materia prima o 2 = PT: producto terminado
    public clasificacion: Clasificacion;
    public clasificaciones: Array<Clasificacion>;
    public clasificacionesportipoMP: Array<Clasificacion>;
    public clasificacionesportipoPT: Array<Clasificacion>;
    public caracteristicas: Caracteristicasfisicas;
    public caracteristicasMP: Array<Caracteristicasfisicas>;
    public caracteristicasPT: Array<Caracteristicasfisicas>;
    /*--------*/
    public clasificacionesCaracteristicas: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasCFmp: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasAQmp: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasCMmp: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasCFpt: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasAQpt: Array<ClasificacionCaracteristica>;
    public clasificacionesCaracteristicasCMpt: Array<ClasificacionCaracteristica>;
    /* --------- */
    public clasificacionesCaracteristicasParaGuardar: Array <ClasificacionCaracteristica>;
    public tipoClasificacionProductoPT = '0'; // A o B o C
    public tipoClasificacionProductoMP = '0'; // A o B o C
    frutas = [{nombre:'manzana', color:'amarillo'},
              {nombre:'pera', color:'verde'},
              {nombre:'granada', color:'palido'},
              {nombre:'mandarina', color:'naranja'}];
  
  constructor(public global: Globals, public servClasificaciones: ClasificacionService,
                public servClasificacionCaracteristica: ClasificacionCaracteristicaService,
                public servCaracteristicas: CaracteristicasService ) { 
                 this.clasificacionesCaracteristicasParaGuardar = new Array<ClasificacionCaracteristica>();
                }
  ngOnInit() {
    this.onLoadClasificaciones();
    this.onLoadCaracteristicas();
   // this.onLoadClasificacion_caracteristicas(this.tipoClasificacionProducto);
  }
  onLoadClasificacion_caracteristicas(tipo: string) {
    this.servClasificacionCaracteristica.getClasificacionCaracteristicaBytipoclas(tipo).subscribe(
      data => {
       this.clasificacionesCaracteristicas = data.body;
       this.filtrar_por_clasificacion(tipo);
         //console.log(this.clasificacionesCaracteristicas);
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
  onLoadCaracteristicas() {
    this.servCaracteristicas.getCaracteristicasMP().subscribe(
      data => {
       this.caracteristicasMP = data.body;
        console.log('Caracterisicas Materia prima');
        console.log(this.caracteristicasMP);
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
      this.servCaracteristicas.getCaracteristicasPT().subscribe(
        data => {
         this.caracteristicasPT = data.body;
         console.log('caracteristicas producto terminado');
          console.log(this.caracteristicasPT);
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
  onLoadClasificaciones() {
   this.servClasificaciones.getProductosClasificacion().subscribe(
     data => {
      this.clasificaciones = data.body;
      this.filtrarportipo();
       console.log(this.clasificaciones);
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
   filtrarportipo() {
      this.clasificacionesportipoMP = new Array<Clasificacion>();
      this.clasificacionesportipoPT = new Array<Clasificacion>();
      this.clasificaciones.forEach(element => {
          if (element.tipo == 'MP') {
            this.clasificacionesportipoMP.push(element);
          }else {
            this.clasificacionesportipoPT.push(element);
          }
      });
   }
   filtrar_por_clasificacion(tipo: string){
    // alert('hola mundilla ' + tipo);
     if (tipo == 'A' || tipo == 'B' || tipo == 'C' ) {
      this.clasificacionesCaracteristicasCFpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasAQpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasCMpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicas.forEach(elem => {
        switch(elem.tipo_caracteristica) {
          case 'CF':
           this.clasificacionesCaracteristicasCFpt.push(elem);
          break;
          case 'AQ':
           this.clasificacionesCaracteristicasAQpt.push(elem);
          break;
          case 'CM':
           this.clasificacionesCaracteristicasCMpt.push(elem);
          break;
        }
      });
      console.log(this.clasificacionesCaracteristicasCFpt);
      console.log(this.clasificacionesCaracteristicasAQpt);
      console.log(this.clasificacionesCaracteristicasCMpt);
      this.cambiaEstadosChekPorClasificacionPT();
     }
     if (tipo == 'D' || tipo == 'E' || tipo == 'F' ) {
      this.clasificacionesCaracteristicasCFmp = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasAQmp = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasCMmp = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicas.forEach(elemento => {
        switch (elemento.tipo_caracteristica) {
          case 'CF':
           this.clasificacionesCaracteristicasCFmp.push(elemento);
          break;
          case 'AQ':
           this.clasificacionesCaracteristicasAQmp.push(elemento);
          break;
          case 'CM':
           this.clasificacionesCaracteristicasCMmp.push(elemento);
          break;
        }
      });
      console.log(this.clasificacionesCaracteristicasCFmp);
      console.log(this.clasificacionesCaracteristicasAQmp);
      console.log(this.clasificacionesCaracteristicasCMmp);
      this.cambiaEstadosChekPorClasificacionMP();
     }
   }
   alerta() {
     alert('hola mundillo ' + this.tipoClasificacionProductoPT);
     alert('hola mundillo ' + this.tipoClasificacionProductoMP);
   }
   cambiatipocheck(check: string){
     if(check == '0')
       return false;
     else
      return true;
   }
   cambiaEstadosChekPorClasificacionPT(){
    //console.log('recorriendo caracteristicas .....');
    this.resetcheckPT();
    this.caracteristicasPT.forEach(elementPT => {
      this.clasificacionesCaracteristicasCFpt.forEach(element => {
        //console.log (element); 
        if(elementPT.esp_car == "CF" && element.id_caracteristica == elementPT.id_caracteristicas_fisicas)  
          {
            console.log('elemento elegido CF');
            console.log('element');
            elementPT.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasAQpt.forEach(element => {
         
        if(elementPT.esp_car == "AQ" && element.id_caracteristica == elementPT.id_caracteristicas_fisicas)  
          {
            console.log('elemento elegido AQ');
            console.log('element');
            elementPT.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasCMpt.forEach(element => {
        
       if(elementPT.esp_car == "CM" && element.id_caracteristica == elementPT.id_caracteristicas_fisicas)  
         {
           console.log('elemento elegido CM');
           console.log('element');
           elementPT.checkeado = true;
         }
     });
    }); 
    
   }

   cambiaEstadosChekPorClasificacionMP(){
    //console.log('recorriendo caracteristicas .....');
    this.resetcheckMP();
    this.caracteristicasMP.forEach(elementMP => {
      this.clasificacionesCaracteristicasCFmp.forEach(element => {
        //console.log (element); 
        if(elementMP.esp_car == "CF" && element.id_caracteristica == elementMP.id_caracteristicas_fisicas)  
          {
            console.log('elemento elegido CF');
            console.log('element');
            elementMP.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasAQmp.forEach(element => {
         
        if(elementMP.esp_car == "AQ" && element.id_caracteristica == elementMP.id_caracteristicas_fisicas)  
          {
            console.log('elemento elegido AQ');
            console.log('element');
            elementMP.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasCMmp.forEach(element => {
        
       if(elementMP.esp_car == "CM" && element.id_caracteristica == elementMP.id_caracteristicas_fisicas)  
         {
           console.log('elemento elegido CM');
           console.log('element');
           elementMP.checkeado = true;
         }
     });
    });    
   }
   resetcheckPT(){
    this.caracteristicasPT.forEach(element => {
      element.checkeado=false;
    });
   }
   resetcheckMP(){
    this.caracteristicasMP.forEach(element => {
      element.checkeado=false;
    });
   }
   enCambioEstadoPT(item: Caracteristicasfisicas){
          item.checkeado = !item.checkeado;
         let paraAgregar: ClasificacionCaracteristica;
         paraAgregar = new ClasificacionCaracteristica();
          if(item.checkeado){
            paraAgregar.id_clasificacion_caracteristica = 0;
            paraAgregar.id_tipo_clasificacion = this.tipoClasificacionProductoPT;
            paraAgregar.id_caracteristica = item.id_caracteristicas_fisicas;
            paraAgregar.tipo_caracteristica = item.tipo;
            
            paraAgregar.estado= 1;
            paraAgregar.usuario_creacion= localStorage.getItem('username');
            paraAgregar.usuario_modificacion = localStorage.getItem('username');  
            console.log(this.clasificacionesCaracteristicasParaGuardar);             
          } /*else {
          this.clasificacionesCaracteristicasParaGuardar.forEach(element => {
              if(element.id_tipo_clasificacion == this.tipoClasificacionProductoPT && element.id_caracteristica )
            });  
         }*/
          //console.log(this.clasificacionesCaracteristicasParaGuardar);
         
   }
}

