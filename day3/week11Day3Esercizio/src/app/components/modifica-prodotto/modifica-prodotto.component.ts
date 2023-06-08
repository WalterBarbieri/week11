import { Component, OnInit } from '@angular/core';
import { ProdottiService } from 'src/app/service/prodotti.service';
import { Prodotto } from 'src/app/models/prodotto.interface';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifica-prodotto',
  templateUrl: './modifica-prodotto.component.html',
  styleUrls: ['./modifica-prodotto.component.scss']
})
export class ModificaProdottoComponent implements OnInit {

  prodotto: Prodotto = {
    codice: '',
    nomeProdotto: '',
    prezzo: 0
  };
  form!: NgForm;
  id: any = localStorage.getItem('product');

  constructor(private prodottiSrv: ProdottiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {


      this.prodottiSrv.recuperaProdotto(this.id).subscribe((prodotto: Prodotto)=> {
        this.prodotto = prodotto;
        console.log(this.prodotto);

        this.setFormValues(this.prodotto);
      })
  }

  modificaProdotto(form: NgForm){
    this.prodotto = form.value;
    console.log(this.prodotto);
    this.prodottiSrv.modifica(this.prodotto, this.id).subscribe((response) => {
      console.log('Prodotto modificato con successo', response);
      this.router.navigate(['/prodotti'])

    }, (error) => {
      console.error(error);

    })

  }

  setFormValues(prodotto: Prodotto): void {
    this.form.setValue({
      codice: prodotto.codice,
      nomeProdotto: prodotto.nomeProdotto,
      prezzo: prodotto.prezzo
    });
  }


}
