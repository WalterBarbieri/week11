import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Prodotto } from '../models/prodotto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  recupera() {
    return this.http.get<Prodotto[]>(`${this.baseURL}prodotti`);
  }

  aggiungi(data: Prodotto) {
    return this.http.post<Prodotto>(`${this.baseURL}prodotti`, data)
  }


  rimuovi(id: number) {
    return this.http.delete(`${this.baseURL}prodotti/${id}`)
  }

}
