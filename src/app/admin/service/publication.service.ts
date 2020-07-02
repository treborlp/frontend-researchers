import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Publication } from '../class/publication';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {URL_BACKEND} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url: string = URL_BACKEND+"/api/researcher"

  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token!=null){
      return this.headers.append('Authorization','Bearer '+token);
    }
    return this.headers;
  }

  private isNoAutorizado(error): boolean{
    if(error.status==401){
      this.router.navigate(["/login"])
      return true;
    }
    if(error.status==403){
      console.log("No tienes permisos para cambiar esta caracteristica")
      this.router.navigate(["/public"])
      return true;
    }
      return false
    
  }

  createPublication(publication: Publication):  Observable<Publication>{
    return this.http.post<Publication>(`${this.url}/publication`, publication, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
           
      })
    )
  }

  getPublicationsById(id: number): Observable<Publication[]>{
    return this.http.get<Publication[]>(`${this.url}/publication/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        console.log("Aquí se encuentra el error");
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }

  

  

}
