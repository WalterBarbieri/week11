import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs';
import { FotoService } from 'src/app/service/foto.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  totFav: number = 0;

  constructor(private fotoSrv: FotoService) { }

  ngOnInit(): void {
    this.fotoSrv.favSub.subscribe((count) =>{
      this.totFav = count;
    })
  }

}
