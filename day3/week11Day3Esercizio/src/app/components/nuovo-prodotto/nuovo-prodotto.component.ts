import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/service/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovo-prodotto',
  templateUrl: './nuovo-prodotto.component.html',
  styleUrls: ['./nuovo-prodotto.component.scss']
})
export class NuovoProdottoComponent implements OnInit {

  prodotto!: Prodotto;

  constructor(private prodottiSrv: ProdottiService, private router: Router) { }

  ngOnInit(): void {
  }

  aggiungiProdotto(form: NgForm) {
    this.prodotto = form.value;
    console.log(this.prodotto);

    this.prodottiSrv.aggiungi(this.prodotto).subscribe();
    this.router.navigate(['/prodotti']);
  }

}
