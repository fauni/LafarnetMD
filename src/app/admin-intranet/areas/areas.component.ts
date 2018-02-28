import { Component, OnInit } from '@angular/core';
import { Areas } from './areas';
import { AreasService } from './areas.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  area: Areas;
  areas: any;
  games = [
    {
      'id': '1',
      'name': 'DOTA 2',
      'genre': 'Strategy'
    },
    {
      'id': '2',
      'name': 'AOE 3',
      'genre': 'Strategy'
    },
    {
      'id': '3',
      'name': 'GTA 5',
      'genre': 'RPG'
    },
    {
      'id': '4',
      'name': 'Far Cry 3',
      'genre': 'Action'
    },
    {
      'id': '5',
      'name': 'GTA San Andreas',
      'genre': 'RPG'
    },
    {
      'id': '6',
      'name': 'Hitman',
      'genre': 'Action'
    },
    {
      'id': '7',
      'name': 'NFS MW',
      'genre': 'Sport'
    }, {
      'id': '8',
      'name': 'Fifa 16',
      'genre': 'Sport'
    }, {
      'id': '9',
      'name': 'NFS Sen 2',
      'genre': 'Sport'
    }, {
      'id': '10',
      'name': 'Witcher Assasins on King',
      'genre': 'Adventure'
    }
  ];

  constructor(public servArea: AreasService) { }

  ngOnInit() {
    this.onLoadAreas();
  }

  onLoadAreas() {
    this.area = new Areas();
      this.servArea.getAreas().subscribe(
      data => {
        this.areas = data.body;
        console.log(this.areas);
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
