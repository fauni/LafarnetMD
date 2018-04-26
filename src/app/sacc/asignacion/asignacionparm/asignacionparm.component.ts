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
    public clasificacionesCaracteristicasParaGuardarPT: Array <ClasificacionCaracteristica>; // Producto terminado
    public clasificacionesCaracteristicasParaGuardarMP: Array <ClasificacionCaracteristica>; // Producto terminado
    public tipoClasificacionProductoPT = '0'; // A o B o C
    public tipoClasificacionProductoMP = '0'; // A o B o C
    frutas = [{nombre: 'manzana', color: 'amarillo'},
              {nombre: 'pera', color: 'verde'},
              {nombre: 'granada', color: 'palido'},
              {nombre: 'mandarina', color: 'naranja'}];
  constructor(public global: Globals, public servClasificaciones: ClasificacionService,
                public servClasificacionCaracteristica: ClasificacionCaracteristicaService,
                public servCaracteristicas: CaracteristicasService ) {
                 this.clasificacionesCaracteristicasParaGuardarPT = new Array<ClasificacionCaracteristica>();
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
         // console.log(this.clasificacionesCaracteristicas);
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
    // alert('tipo);
     if (tipo == 'A' || tipo == 'B' || tipo == 'C' ) {
      this.clasificacionesCaracteristicasCFpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasAQpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicasCMpt = new Array<ClasificacionCaracteristica>();
      this.clasificacionesCaracteristicas.forEach(elem => {
        switch (elem.tipo_caracteristica) {
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
      this.InsertaClasifCaracParaGuardarExistentePT();
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
      this.InsertaClasifCaracParaGuardarExistenteMP();
      this.cambiaEstadosChekPorClasificacionMP();
     }
   }
   alerta() {
     alert('hola mundillo ' + this.tipoClasificacionProductoPT);
     alert('hola mundillo ' + this.tipoClasificacionProductoMP);
   }
   cambiatipocheck(check: string) {
     if (check == '0')
       return false;
     else
      return true;
   }
   cambiaEstadosChekPorClasificacionPT() {// cambia estados de los checkboxes dependiendo si existe la clasificacio_caracteristica
    // console.log('recorriendo caracteristicas .....');
    this.resetcheckPT();
    this.caracteristicasPT.forEach(elementPT => {
      this.clasificacionesCaracteristicasCFpt.forEach(element => {
        // console.log (element);
        if (elementPT.esp_car == 'CF' && element.id_caracteristica == elementPT.id_caracteristicas_fisicas && element.estado == 1)
          {
            // console.log('elemento elegido CF');
           // console.log('element');
            elementPT.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasAQpt.forEach(element => {
        if(elementPT.esp_car == 'AQ' && element.id_caracteristica == elementPT.id_caracteristicas_fisicas && element.estado == 1) {
           // console.log('elemento elegido AQ');
           // console.log('element');
            elementPT.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasCMpt.forEach(element => { 
       if(elementPT.esp_car == 'CM' && element.id_caracteristica == elementPT.id_caracteristicas_fisicas && element.estado == 1) {
          // console.log('elemento elegido CM');
          // console.log('element');
           elementPT.checkeado = true;
         }
     });
    });
   }

   cambiaEstadosChekPorClasificacionMP(){
    // console.log('recorriendo caracteristicas .....');
    this.resetcheckMP();
    this.caracteristicasMP.forEach(elementMP => {
      this.clasificacionesCaracteristicasCFmp.forEach(element => {
        // console.log (element);
        if (elementMP.esp_car == 'CF' && element.id_caracteristica == elementMP.id_caracteristicas_fisicas && element.estado == 1) {
            // console.log('elemento elegido CF');
            // console.log('element');
            elementMP.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasAQmp.forEach(element => {
        if(elementMP.esp_car == 'AQ' && element.id_caracteristica == elementMP.id_caracteristicas_fisicas && element.estado == 1) {
            // console.log('elemento elegido AQ');
            // console.log('element');
            elementMP.checkeado = true;
          }
      });
      this.clasificacionesCaracteristicasCMmp.forEach(element => {
       if (elementMP.esp_car == 'CM' && element.id_caracteristica == elementMP.id_caracteristicas_fisicas && element.estado == 1) {
           // console.log('elemento elegido CM');
           // console.log('element');
           elementMP.checkeado = true;
         }
     });
    });
   }
   resetcheckPT() {
    this.caracteristicasPT.forEach(element => {
      element.checkeado = false;
    });
   }
   resetcheckMP() {
    this.caracteristicasMP.forEach(element => {
      element.checkeado = false;
    });
   }
   /* ****************para almacenar cambios localmente PT************** */
   enCambioEstadoPT(item: Caracteristicasfisicas) { // cambio de estado de los checkbox
          item.checkeado = !item.checkeado;
         let paraAgregar: ClasificacionCaracteristica;
         paraAgregar = new ClasificacionCaracteristica();
          if (item.checkeado) {
            paraAgregar.id_clasificacion_caracteristica = 0;
            paraAgregar.id_tipo_clasificacion = this.tipoClasificacionProductoPT;
            paraAgregar.id_caracteristica = item.id_caracteristicas_fisicas;
            paraAgregar.tipo_caracteristica = item.esp_car;
            paraAgregar.estado = 1;
            paraAgregar.usuario_creacion = localStorage.getItem('username');
            paraAgregar.fecha_creacion = '0000-00-00 00:00:00';
            paraAgregar.fecha_modificacion = '0000-00-00 00:00:00';
            paraAgregar.usuario_modificacion = localStorage.getItem('username');
            let indice = this.ExisteClasificacionCaracteristicaParaGuardarPT(paraAgregar);
            if (indice >= 0) {
                this.clasificacionesCaracteristicasParaGuardarPT[indice].estado = 1 ;
                this.clasificacionesCaracteristicasParaGuardarPT[indice].usuario_modificacion = localStorage.getItem('username');
                this.clasificacionesCaracteristicasParaGuardarPT[indice].fecha_modificacion = this.fechaactual();
              } else {
                this.clasificacionesCaracteristicasParaGuardarPT.push(paraAgregar);
              }
           console.log(this.clasificacionesCaracteristicasParaGuardarPT);
           // for (var i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
           // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i].id_clasificacion_caracteristica);
            // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i]);
           // }
          } else {
           this.eliminaElementoClasifCaracPT(item);
          // for (var i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
            // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i].id_clasificacion_caracteristica);
             // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i]);
          // }
           console.log(this.clasificacionesCaracteristicasParaGuardarPT);
         }
          // console.log(this.clasificacionesCaracteristicasParaGuardarPT);
   }
   eliminaElementoClasifCaracPT(itmcc: Caracteristicasfisicas) {
    let nuevo: Array <ClasificacionCaracteristica>;
    nuevo = new Array <ClasificacionCaracteristica>();
    let resp = 0;
    for (let i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
      let itemc = this.clasificacionesCaracteristicasParaGuardarPT[i];
      if (itemc.id_tipo_clasificacion == this.tipoClasificacionProductoPT && itemc.id_caracteristica == itmcc.id_caracteristicas_fisicas
        && itemc.tipo_caracteristica == itmcc.esp_car && itemc.id_clasificacion_caracteristica == 0 ) {
           resp = 1;
           // this.clasificacionesCaracteristicasParaGuardarPT[i].estado = -1;
        } else {
          if (itemc.id_tipo_clasificacion == this.tipoClasificacionProductoPT && itemc.id_caracteristica == itmcc.id_caracteristicas_fisicas
            && itemc.tipo_caracteristica == itmcc.esp_car && itemc.id_clasificacion_caracteristica != 0) {
              this.clasificacionesCaracteristicasParaGuardarPT[i].estado = 0;
            }
          nuevo.push(this.clasificacionesCaracteristicasParaGuardarPT[i]);
        }
      }
      this.clasificacionesCaracteristicasParaGuardarPT = nuevo;
      return resp;
   }
   // insertar elementos existentes que ya estan chekeados en el array para guardar elementos en la Bd
  InsertaClasifCaracParaGuardarExistentePT(){
    this.clasificacionesCaracteristicasParaGuardarPT= new Array<ClasificacionCaracteristica>();
    this.clasificacionesCaracteristicasCFpt.forEach(element=>{
      this.clasificacionesCaracteristicasParaGuardarPT.push(element);
    })
    this.clasificacionesCaracteristicasAQpt.forEach(element => {
      this.clasificacionesCaracteristicasParaGuardarPT.push(element);
    });
    this.clasificacionesCaracteristicasCMpt.forEach(element => {
      this.clasificacionesCaracteristicasParaGuardarPT.push(element);
    });
    console.log('Clasificacion caracteristica para guardar');
    // console.log(this.clasificacionesCaracteristicasParaGuardarPT);
  }

  ExisteClasificacionCaracteristicaParaGuardarPT(item: ClasificacionCaracteristica)
  {
    for (let i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
      if (item.id_tipo_clasificacion == this.clasificacionesCaracteristicasParaGuardarPT[i].id_tipo_clasificacion &&
         item.id_caracteristica == this.clasificacionesCaracteristicasParaGuardarPT[i].id_caracteristica &&
         item.tipo_caracteristica == this.clasificacionesCaracteristicasParaGuardarPT[i].tipo_caracteristica) {
            return i;
          }
    }
    return -1;
  }
   /* ****************fin para almacenar cambios localmente PT************* */

    /* ****************para almacenar cambios localmente MP************** */
    enCambioEstadoMP(item: Caracteristicasfisicas) {// cambio de estado de los checkbox
      item.checkeado = !item.checkeado;
     let paraAgregar: ClasificacionCaracteristica;
     paraAgregar = new ClasificacionCaracteristica();
      if (item.checkeado) {
        paraAgregar.id_clasificacion_caracteristica = 0;
        paraAgregar.id_tipo_clasificacion = this.tipoClasificacionProductoMP;
        paraAgregar.id_caracteristica = item.id_caracteristicas_fisicas;
        paraAgregar.tipo_caracteristica = item.esp_car;
        paraAgregar.estado = 1;
        paraAgregar.usuario_creacion = localStorage.getItem('username');
        paraAgregar.fecha_creacion = '0000-00-00 00:00:00';
        paraAgregar.fecha_modificacion = '0000-00-00 00:00:00';
        paraAgregar.usuario_modificacion = localStorage.getItem('username');
        let indice = this.ExisteClasificacionCaracteristicaParaGuardarMP(paraAgregar);
        if (indice >= 0) {
            this.clasificacionesCaracteristicasParaGuardarMP[indice].estado = 1 ;
            this.clasificacionesCaracteristicasParaGuardarMP[indice].usuario_modificacion = localStorage.getItem('username');
            this.clasificacionesCaracteristicasParaGuardarMP[indice].fecha_modificacion = this.fechaactual();
          } else {
            this.clasificacionesCaracteristicasParaGuardarMP.push(paraAgregar);
          }
       console.log(this.clasificacionesCaracteristicasParaGuardarMP);
       // for (var i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
       // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i].id_clasificacion_caracteristica);
        // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i]);
       // }
      } else {
       this.eliminaElementoClasifCaracMP(item);
      // for (var i = 0; i < this.clasificacionesCaracteristicasParaGuardarPT.length; i++) {
        // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i].id_clasificacion_caracteristica);
         // console.log(this.clasificacionesCaracteristicasParaGuardarPT[i]);
      // }
       console.log(this.clasificacionesCaracteristicasParaGuardarMP);
     }
      // console.log(this.clasificacionesCaracteristicasParaGuardarPT);
   }
   eliminaElementoClasifCaracMP(itmcc: Caracteristicasfisicas) {
    let nuevo: Array <ClasificacionCaracteristica>;
    nuevo = new Array <ClasificacionCaracteristica>();
    let resp = 0;
    for (let i = 0; i < this.clasificacionesCaracteristicasParaGuardarMP.length; i++) {
      let itemc = this.clasificacionesCaracteristicasParaGuardarMP[i];
      if (itemc.id_tipo_clasificacion == this.tipoClasificacionProductoMP && itemc.id_caracteristica == itmcc.id_caracteristicas_fisicas
        && itemc.tipo_caracteristica == itmcc.esp_car && itemc.id_clasificacion_caracteristica == 0 ) {
           resp = 1;
           // this.clasificacionesCaracteristicasParaGuardarPT[i].estado = -1;
        } else {
          if (itemc.id_tipo_clasificacion == this.tipoClasificacionProductoMP && itemc.id_caracteristica == itmcc.id_caracteristicas_fisicas
            && itemc.tipo_caracteristica == itmcc.esp_car && itemc.id_clasificacion_caracteristica != 0)
            {
              this.clasificacionesCaracteristicasParaGuardarMP[i].estado = 0;
            }
          nuevo.push(this.clasificacionesCaracteristicasParaGuardarMP[i]);
        }
      }
      this.clasificacionesCaracteristicasParaGuardarMP = nuevo;
      return resp;
   }
   InsertaClasifCaracParaGuardarExistenteMP() {
    this.clasificacionesCaracteristicasParaGuardarMP = new Array<ClasificacionCaracteristica>();
    this.clasificacionesCaracteristicasCFmp.forEach(element => {
      this.clasificacionesCaracteristicasParaGuardarMP.push(element);
    })
    this.clasificacionesCaracteristicasAQmp.forEach(element => {
      this.clasificacionesCaracteristicasParaGuardarMP.push(element);
    });
    this.clasificacionesCaracteristicasCMmp.forEach(element => {
      this.clasificacionesCaracteristicasParaGuardarMP.push(element);
    });
    console.log('Clasificacion caracteristica para guardar');
    console.log(this.clasificacionesCaracteristicasParaGuardarMP);
  }

  ExisteClasificacionCaracteristicaParaGuardarMP(item: ClasificacionCaracteristica) {
    for (let i = 0; i < this.clasificacionesCaracteristicasParaGuardarMP.length; i++) {
      if (item.id_tipo_clasificacion == this.clasificacionesCaracteristicasParaGuardarMP[i].id_tipo_clasificacion &&
         item.id_caracteristica == this.clasificacionesCaracteristicasParaGuardarMP[i].id_caracteristica &&
         item.tipo_caracteristica == this.clasificacionesCaracteristicasParaGuardarMP[i].tipo_caracteristica ) {
          console.log('comparando caracteristicas');
          console.log(item.id_tipo_clasificacion + '==' + this.clasificacionesCaracteristicasParaGuardarMP[i].id_tipo_clasificacion 
          + ' and ' + item.id_caracteristica + '==' + this.clasificacionesCaracteristicasParaGuardarMP[i].id_caracteristica + ' and ' +
            item.tipo_caracteristica + '==' + item.tipo_caracteristica + '--' + i);
            return i;
          }
    }
    return -1;
  }
    /* ****************fin para almacenar cambios localmente MP***************** */

    /*** guardar cambios en la Bd PT*** */
    guardaBDListaClasifCaracPT() {
       this.clasificacionesCaracteristicasParaGuardarPT.forEach(element => {
         this.guardar(element);
       });
    }
    /**fin guardar cambios en la Bd PT*/
    /* *** guardar cambios en la Bd MP*** */
    guardaBDListaClasifCaracMP() {
      this.clasificacionesCaracteristicasParaGuardarMP.forEach(element => {
        this.guardar(element);
      });
   }
    /**fin guardar cambios en la Bd MT*/
    guardar(clasifacarac: ClasificacionCaracteristica) {
      if (clasifacarac.id_clasificacion_caracteristica == 0) {
        this.insertBDClasifCarac(clasifacarac);
      } else {
        this.updateBDClasifCarac(clasifacarac);
      }
    }
    insertBDClasifCarac(clasifacarac: ClasificacionCaracteristica) {
      this.servClasificacionCaracteristica.insertClasificacionCaracteristica (clasifacarac).subscribe(
        data => {
          console.log(data);
                },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
      ) ;
     }
     updateBDClasifCarac(clasifacarac: ClasificacionCaracteristica) {
      this.servClasificacionCaracteristica.updateClasificacionCaracteristica (clasifacarac).subscribe(
        data => {
          console.log(data);
                },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('Ocurrio un error:', err.error.message);
            } else {
              console.log(`El servidor respondio: ${err.status}, body was: ${err.error}`);
            }
          }
      ) ;
     }
activaBoton(tipoclasif: string) {
  if (tipoclasif == '0') { return true; } else { return false; }
}
 fechaactual() {
  let fecha = new Date();
  let fechafor = fecha.getFullYear() + '-' + this.ceros(fecha.getMonth() + 1) + '-' + this.ceros(fecha.getDate()) + ' ' +
           this.ceros(fecha.getHours()) + ':' + this.ceros(fecha.getMinutes()) + ':' + this.ceros(fecha.getSeconds());
  return fechafor;
 }
    ceros(valor) {
       let nval = '';
       if (valor < 10) {
         nval = '0' + valor;
       }else {
          nval = '' + valor;
       }
     return nval;
    }
}

