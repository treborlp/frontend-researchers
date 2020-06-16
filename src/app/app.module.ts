import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'; // Necesario para rutas
import { HttpClientModule } from '@angular/common/http'; //Modulo para consumo de peticiones web http
import { FormsModule } from "@angular/forms"; //Necesario paraactivar los formularios

import { AppComponent } from './app.component';
import { ResearcherComponent } from './admin/researcher/researcher.component';
import { ProfilesComponent } from './public/profiles/profiles.component';

//objeto de rutas
const routes: Routes = [
  {path:'', redirectTo:'public/researcher', pathMatch: 'full'},
  {path:'public/researcher', component: ProfilesComponent },
  {path:'admin/researcher', component: ResearcherComponent },

  
];

@NgModule({
  declarations: [
    AppComponent,
    ResearcherComponent,
    ProfilesComponent
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
