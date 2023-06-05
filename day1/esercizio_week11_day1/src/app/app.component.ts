import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core';
import { Foto } from './interface/foto.interface';
import { FotoService } from './service/foto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'esercizio_week11_day1';

  isLoading = false;

  sub!: Subscription;
  fotos: Foto[] = [];

  constructor(private http: HttpClient, private fotoSrv: FotoService) {}

  ngOnInit(): void {
    this.recuperaFoto()
  }

  recuperaFoto() {

    this.sub = this.fotoSrv.recupera().subscribe((lista) =>{
      console.log(lista);
      this.fotos = lista;
      this.isLoading = true;
    }, (err)=> {
      alert(err)
    })
  }

  rimuoviFoto(id: number) {
    this.sub = this.fotoSrv.rimuovi(id).subscribe(() => {
      this.fotos = this.fotos.filter((foto) => foto.id != id);
      console.log(`Foto n. ${id} cancellata`);

    }, (err)=> {
      alert(err)
    })
  }
  favFoto() {
    this.fotoSrv.addFav()
  }

}
