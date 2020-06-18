import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Researcher } from '../class/researcher';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResearcherService {

  private url: string = "http://localhost:8080/api/researcher"

  private headers = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  createResearcher(researcher: Researcher): Observable<Researcher>{
    return this.http.post<Researcher>(this.url, researcher, {headers: this.headers})
  }

  findResearcher(id: number): Observable<Researcher>{
    return this.http.get<Researcher>(`${this.url}/${id}`)
  }

  getResearchers(): Observable<Researcher[]>{
    return this.http.get(this.url).pipe(
      map((response) => response as Researcher[])
    )
  }

  

}
