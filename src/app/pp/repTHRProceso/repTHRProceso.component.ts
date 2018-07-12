import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { EtapasProcesoService } from '../etapasproceso.service';
import { EtapasForLote } from '../etapasproceso';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-repthrproceso',
  templateUrl: './repTHRProceso.component.html',
  styleUrls: ['./repTHRProceso.component.scss']
})
export class RepTHRProcesoComponent implements OnInit {
	public etapasforlote: Array<EtapasForLote> = [];
	public numero_lote: String = '';
	public simpleCollapsibleItems = [
		{
		  icon: 'cloud',
		  header: 'First',
		  body: `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
			ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
			adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
			dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
			aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
	
		},
		{
		  icon: 'flash',
		  header: 'Second',
		  body: `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
		},
		{
		  icon: 'gamepad',
		  header: 'Third',
		  body: `
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
		},
	  ];
  constructor(private servEtapaProceso: EtapasProcesoService) { }

  ngOnInit() {

  }

  export(): void {
		let sheetName = 'sheet1';
		var tbl = document.getElementById('testTable');
			/* generate worksheet */
		let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tbl, {raw: true});

			/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, sheetName);

			/* save to file */
		XLSX.writeFile(wb, 'test.xlsx', {type: 'base64'});
	}

	onLoadProcesoForLote() {
		this.onLoadEtapasForLote(this.numero_lote.replace('/', '|'));
	}

	onLoadEtapasForLote(datos) {
		console.log(this.etapasforlote);
		this.etapasforlote.splice(0);
		console.log(this.etapasforlote);
    this.servEtapaProceso.getEtapasForLote(datos).subscribe(
      data => {
				this.etapasforlote = data['body'];
				console.log(this.etapasforlote);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('Ocurrio un error:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`El servidor respondio: {err.status}, body was: {err.error}`);
        }
      }
    );
  }
	
}
