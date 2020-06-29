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
  flagForm: boolean = false;
  constructor(private researcherService: ResearcherService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.existProfile();
    
    //this.researcher.usuario = this.authService.usuario;
  }

  public crearResearcher(): void{
    
    //this.usuario = this.authService.usuario;
    this.usuario.id =this.authService.usuario.id;
    this.researcher.usuario = this.usuario;
    //console.log(this.usuario);
    //console.log(this.researcher);

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
        if(profile==null){
          this.flagForm = true
          
        }else{
          this.flagForm = false
          this.publication.researcher = profile;

        }
      }
    )
  }

  
}
