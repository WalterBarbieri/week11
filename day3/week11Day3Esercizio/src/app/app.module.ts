import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProdottiComponent } from './components/prodotti/prodotti.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { NuovoProdottoComponent } from './components/nuovo-prodotto/nuovo-prodotto.component';
import { ModificaProdottoComponent } from './components/modifica-prodotto/modifica-prodotto.component';

const route: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'prodotti',
    component: ProdottiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'nuovoProdotto',
    component: NuovoProdottoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modificaProdotto',
    component: ModificaProdottoComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProdottiComponent,
    LoginComponent,
    RegisterComponent,
    NuovoProdottoComponent,
    ModificaProdottoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(route)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
