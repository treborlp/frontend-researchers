import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'; // Necesario para rutas

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
    RouterModule.forRoot(routes) //Agregamos las rutas con el objeto creado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
