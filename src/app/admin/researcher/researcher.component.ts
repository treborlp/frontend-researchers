import { Component, OnInit } from '@angular/core';
import { ResearcherService } from '../service/researcher.service';
import { Researcher } from '../class/researcher';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  researcher: Researcher = new Researcher();
  researchers: Researcher[];
  constructor(private researcherService: ResearcherService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.researcher.usuario = this.authService.usuario;
  }

  public crearResearcher(): void{
    console.log(this.researcher)
    this.researcherService.createResearcher(this.researcher).subscribe(
      researcher => {
        //this.router.navigate(['/sectores'])
        //Swal.fire('Nuevo Sector', `Sector ${sector.nombreSector}`, 'success')   
        console.log(`Researcher was created`);
        this.cargarUsuarios();     
      }
    )
  }

  cargarUsuarios(): void{
    this.researcherService.getResearchers().subscribe(
      researchers => this.researchers = researchers  
    )
  }

}
