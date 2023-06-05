import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Foto } from '../interface/foto.interface';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FotoService {

  baseUrl = 'https://jsonplaceholder.typicode.com/photos';

  favSub = new Subject<number>();
  favCounter = 0;

  constructor(private http: HttpClient) {}

  recupera() {
    return this.http
      .get<Foto[]>(this.baseUrl).pipe(catchError(err => {
        return throwError(this.getErrorMess(err.status))
      }));
  }

  rimuovi(id: number) {
    return this.http.delete<any[]>('https://jsonplaceholder.typicode.com/photos/' + id).pipe(catchError(err => {
      return throwError(this.getErrorMess(err.status))
    }));
  }

  addFav() {
    this.favCounter ++;
    this.favSub.next(this.favCounter)
  }

  private getErrorMess(status:number){
    let mess= ''
    switch (status) {
      case 404:
        mess = 'errore nella chiamata'
        break;

      default:
        mess = 'qualcosa non va controlla la connessione'
        break;
    }
    return mess
  }
}
