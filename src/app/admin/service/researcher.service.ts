import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Researcher } from '../class/researcher';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Publication } from '../class/publication';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private url: string = "http://localhost:8080/api/researcher"

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

  createResearcher(researcher: Researcher): Observable<Researcher>{
    return this.http.post<Researcher>(this.url, researcher, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
           
      })
    )
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

  findResearcher(id: number): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  getResearchers(): Observable<Researcher[]>{
    return this.http.get<Researcher[]>(this.url, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }

  

  

}
