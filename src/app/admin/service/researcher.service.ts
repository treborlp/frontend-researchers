import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Researcher } from '../class/researcher';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private url: string = "http://localhost:8080/api/researcher"

  private headers = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(error): boolean{
    if(error.status==401 || error.status==403){
      this.router.navigate(["/login"])
      return true;
    }else{
      return false
    }
  }

  createResearcher(researcher: Researcher): Observable<Researcher>{
    return this.http.post<Researcher>(this.url, researcher, {headers: this.headers}).pipe(
      catchError(e=>  {
        if(this.isNoAutorizado(e))
           return throwError(e);
      })
    )
  }

  findResearcher(id: number): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/${id}`).pipe(
      catchError(e=>  {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }

  getResearchers(): Observable<Researcher[]>{
    return this.http.get(this.url).pipe(
      map((response) => response as Researcher[]),
      catchError(e=>  {
           this.isNoAutorizado(e)
           return throwError(e);
      })
    )
  }

  

}
