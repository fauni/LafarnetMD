import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-repthrproceso',
  templateUrl: './repTHRProceso.component.html',
  styleUrls: ['./repTHRProceso.component.scss']
})
export class RepTHRProcesoComponent implements OnInit {

  constructor() { }

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
}
