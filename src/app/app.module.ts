import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'; // Necesario para rutas
import { HttpClientModule } from '@angular/common/http'; //Modulo para consumo de peticiones web http
import { FormsModule } from "@angular/forms"; //Necesario paraactivar los formularios

import { AppComponent } from './app.component';
import { ResearcherComponent } from './admin/researcher/researcher.component';
import { ProfilesComponent } from './public/profiles/profiles.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './admin/guard/auth.guard';
import { HeaderComponent } from './sections/header/header.component';

//objeto de rutas
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'public', component: ProfilesComponent },
  {path:'admin', component: ResearcherComponent, canActivate: [AuthGuard] },
  {path:'login', component: LoginComponent },

  
];

@NgModule({
  declarations: [
    AppComponent,
    ResearcherComponent,
    ProfilesComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // necesario para consumir peticiones http
    FormsModule, // necesario para activar los modulos
    RouterModule.forRoot(routes) //Agregamos las rutas con el objeto creado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
