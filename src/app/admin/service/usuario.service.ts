import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Usuarios } from '../class/usuarios';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = "http://localhost:8080/api/usuarios"

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

  getPublicProfileUserByUsername(username: string): Observable<Usuarios>{
    return this.http.get<Usuarios>(`${this.url}/public/${username}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>  {
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }

}
