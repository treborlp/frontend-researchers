import { Component, OnInit } from '@angular/core';
import { ResearcherService } from '../service/researcher.service';
import { Researcher } from '../class/researcher';
import { AuthService } from '../service/auth.service';
import { Publication } from '../class/publication';
import { Usuarios } from '../class/usuarios';
import { Router } from '@angular/router';
import { PublicationService } from '../service/publication.service';

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
  constructor(private researcherService: ResearcherService, 
    private authService: AuthService, 
    private router: Router,
    private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.existProfile(); //verifica si el usuario ya tiene un perfil de investigador
    this.cargarUsuarios(); 
    this.cargarPublicaciones();

  }

  crearResearcher(): void{
    
    this.usuario.id =this.authService.usuario.id;
    this.researcher.usuario = this.usuario;

    this.researcherService.createResearcher(this.researcher).subscribe(
      researcher => {

        this.researcher =  researcher;
        console.log(`${this.researcher.id} Researcher was created`);
        this.existProfile();
        this.cargarUsuarios();
             
      }
    )

  }

  cargarPublicaciones(){
    this.publicationService.getPublicationsById(this.researcher.id).subscribe(
        publications => {
          if(publications!=null){
            console.log(publications);
          }
        }
    )
  }

  actualizarUsuario(): void{
   this.researcherService.updateResearcher(this.researcher).subscribe(
      researcher => {
        this.researcher = researcher
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

    
    this.publicationService.createPublication(this.publication).subscribe(
      publication => {
        console.log("publicacion creada");
      }
    )

  }

  existProfile(): void{
    this.researcherService.checkResearchProfile(this.authService.usuario.id).subscribe(
      profile => {
          if(profile!=null){ // Si el usuario ya tiene el perfil de investigador
            this.researcher = profile; //Asignamos a la variable usuario this.researcher con los datos del perfi de investigador
          }
          this.publication.researcher = profile;
        }
    )
  }


  
}
