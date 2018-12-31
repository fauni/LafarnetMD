import { Injectable } from '@angular/core';

@Injectable()
export class Comunes {
  constructor() { }

  // Obtiene la fecha actual en formato yyyy-MM-dd
    obtenerFechaActual() {
        let n = new Date();
        let y = n.getFullYear();
        let m = n.getMonth() + 1;
        let d = n.getDate();
        return y + '-' + m + '-' + d;
    }

    obtenerFechaYHoraActual(): string {
        let fecha_actual: string = '';
        let fecha: Date = new Date();
        fecha_actual = fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        return fecha_actual;
    }
}






