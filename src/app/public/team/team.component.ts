import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearcherService } from 'src/app/admin/service/researcher.service';
import { Researcher } from 'src/app/admin/class/researcher';
import { Usuarios } from 'src/app/admin/class/usuarios';
import { UsuarioService } from 'src/app/admin/service/usuario.service';
import { PublicationService } from 'src/app/admin/service/publication.service';
import { Publication } from 'src/app/admin/class/publication';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  researcher: Researcher = new Researcher();
  usuario:  Usuarios = new Usuarios();
  publicaciones: Publication[];
  constructor(private activatedRoute: ActivatedRoute, 
    private researcherService: ResearcherService,
    private usuarioService: UsuarioService,
    private publicacionesService: PublicationService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
     let username = params.get('username');
      if (username) {
        this.researcherService.getPublicProfileResearcher(username).subscribe(researcher =>{
          this.researcher = researcher
          this.publicacionesService.getPublicationsById(this.researcher.id).subscribe(publicaciones => this.publicaciones = publicaciones)
        })
        this.usuarioService.getPublicProfileUserByUsername(username).subscribe(usuario => {
          this.usuario = usuario})
        
      }     
    });

  }

}
