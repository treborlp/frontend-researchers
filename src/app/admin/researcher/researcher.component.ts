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
  countPublication: number =0;
  publication: Publication = new Publication();
  publications: Publication[];
  usuario: Usuarios = new Usuarios();
  usuario2: Usuarios = new Usuarios();
  flagEdit: boolean = true;
  constructor(private researcherService: ResearcherService, 
    private authService: AuthService, 
    private router: Router,
    private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.usuario2 = this.authService.usuario as Usuarios;
    this.usuarioTienePerfilDeInvestigador(); //verifica si el usuario ya tiene un perfil de investigador

  }

  crearResearcher(): void{
  
    this.usuario.id =this.authService.usuario.id; //Se asocia el identificado del usuario a su perfil de investigador
    this.researcher.usuario = this.usuario; //Se asocia el identificado del usuario a su perfil de investigador

    this.researcherService.createResearcher(this.researcher).subscribe(
      researcher => {
        this.researcher =  researcher;
        this.usuarioTienePerfilDeInvestigador();
      }
    )
  }

  cargarPublicaciones(): void{
    this.publicationService.getPublicationsById(this.researcher.id).subscribe(
        publications => {
          if(publications!=null){
            this.publications = publications
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


  crearPublication(): void{

    this.publicationService.createPublication(this.publication).subscribe(
      publication => {
        this.cargarPublicaciones();
        this.publication = new Publication(); //Reinicializamos el objeto para limpiar el formulario de Publicaciones
        this.publication.researcher = this.researcher; //Asignamos el perfil de investigador al nuevo objeto
      }
    )

  }

  usuarioTienePerfilDeInvestigador(): void{
    this.researcherService.checkResearchProfile(this.authService.usuario.id).subscribe(
      profile => {
          if(profile!=null){ // Si el usuario ya tiene el perfil de investigador no entra en este bloque
            this.researcher = profile ; //Asignamos a la variable usuario this.researcher con los datos del perfi de investigador
            this.cargarPublicaciones();
          }
          this.publication.researcher = profile; // Si el usuario ya tiene perfil de investigador, se asigna su identificador a los registros de publicaciones
        }
    )
  }


  
}
