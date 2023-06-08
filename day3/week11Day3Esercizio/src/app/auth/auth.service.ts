import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jvtHelper = new JwtHelperService();

  baseURL = environment.baseURL;

  private authSubj = new BehaviorSubject<null | AuthData>(null);

  utente!: AuthData;

  user$ = this.authSubj.asObservable();

  timeOutLogout: any;

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.baseURL}login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        this.utente = data;
        console.log(this.utente);
        localStorage.setItem('user', JSON.stringify(data));
        this.autoLogOut(data);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }

    const userData: AuthData = JSON.parse(user);
    if (this.jvtHelper.isTokenExpired(userData.accessToken)) {
      return;
    }

    this.authSubj.next(userData);

    this.autoLogOut(userData)
  }

  signUp(data: {nome: string, cognome: string, email: string, password: string}) {
    return this.http.post(`${this.baseURL}register`, data)
  }

  logOut() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/'])

    if (this.timeOutLogout) {
      clearTimeout(this.timeOutLogout)
    }
  }

  autoLogOut(data: AuthData) {
    const expirationDate = this.jvtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const expirationMillisecond = expirationDate.getTime() - new Date().getTime();
    this.timeOutLogout = setTimeout(() => {
      this.logOut()
    }, expirationMillisecond)
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email already exist':
        return throwError('Utente già presente');
        break;
        case 'Email format is invalid':
          return throwError('Format email non valido');
          break;
          default:
          return throwError('Errore nella chiamata')
    }
  }

}
