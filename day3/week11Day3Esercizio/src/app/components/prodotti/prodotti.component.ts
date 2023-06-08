import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { ProdottiService } from 'src/app/service/prodotti.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-prodotti',
  templateUrl: './prodotti.component.html',
  styleUrls: ['./prodotti.component.scss']
})
export class ProdottiComponent implements OnInit {

  sub!: Subscription;

  prodotti: Prodotto[] | undefined;

  constructor(private prodSrv: ProdottiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.sub = this.prodSrv.recupera().subscribe((prodotti: Prodotto[]) => {
        this.prodotti = prodotti;
      })
    }, 1000)
  }


  rimuoviProdotto(id: number | undefined) {
    if (id){
    this.prodSrv.rimuovi(id).subscribe(() =>{
      this.prodotti = this.prodotti?.filter(prodotto => prodotto.id !== id)
    })
  }
  }


}
