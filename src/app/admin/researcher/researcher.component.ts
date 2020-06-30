import { Component, OnInit } from '@angular/core';
import { ResearcherService } from '../service/researcher.service';
import { Researcher } from '../class/researcher';
import { AuthService } from '../service/auth.service';
import { Publication } from '../class/publication';
import { Usuarios } from '../class/usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-researcher',
  templateUrl: './researcher.component.html',
  styleUrls: ['./researcher.component.css']
})
export class ResearcherComponent implements OnInit {

  researcher: Researcher = new Researcher();
  researchers: Researcher[];
  publication: Publication = new Publication();
  usuario: Usuarios = new Usuarios();
  flagEdit: boolean = true;
  constructor(private researcherService: ResearcherService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.existProfile();
    this.cargarUsuarios();

    //this.researcher.usuario = this.authService.usuario;
  }

  crearResearcher(): void{
    
    this.usuario.id =this.authService.usuario.id;
    this.researcher.usuario = this.usuario;

    this.researcherService.createResearcher(this.researcher).subscribe(
      researcher => {
        //this.router.navigate(['/sectores'])
        //Swal.fire('Nuevo Sector', `Sector ${sector.nombreSector}`, 'success')   
        
        this.researcher =  researcher;
        console.log(`${this.researcher.id} Researcher was created`);
        //console.log(this.researcher.maxDegree);
        this.existProfile();
        this.cargarUsuarios();
             
      }
    )

  }

  actualizarUsuario(): void{}

  cargarUsuarios(): void{
    console.log("Aqui cargamos los usuarios")
    this.researcherService.getResearchers().subscribe(
      researchers => {
        this.researchers = researchers
      }  
    )
  }

  crearPublication(): void{
    
    //console.log(this.publication)
    
    this.researcherService.createPublication(this.publication).subscribe(
      publication => {
        console.log("publicacion creada");
      }
    )

  }

  existProfile(): void{
    this.researcherService.checkResearchProfile(this.authService.usuario.id).subscribe(
      profile => {
          if(profile!=null){
            this.researcher = profile;
          }
          this.publication.researcher = profile;
        }
    )
  }

  onKey(event: any) { // without type info
   // this.values += event.target.value + ' | ';
   console.log(event);
  }

  
}
