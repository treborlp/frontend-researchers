import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Usuarios } from '../class/usuarios';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  usuario: Usuarios;

  constructor( @Inject(DOCUMENT) private _document, private auth: AuthService, private router: Router ) { 
    this.usuario = new Usuarios();
  }


  ngOnInit(): void {
    //console.log(this.auth.isAuthenticated())
    this._document.body.classList.add('bodybg-color');
    if(this.auth.isAuthenticated()){
      this.router.navigate(["/public"]);
    }
   
  }

  ngOnDestroy() {
    // remove the class form body tag
    this._document.body.classList.add('bodybg-color');
  }

  login(): void{

    //console.log(this.usuario)
    if(this.usuario.username == null || this.usuario.password==null){
      console.log("Debe completar los campos")
    }
    
    this.auth.login(this.usuario).subscribe(response => {
      
      console.log(response.access_token)
      this.auth.guardarUsuario(response.access_token)
      this.auth.gurdarToken(response.access_token);

      let usuario = this.auth.usuario;
      
     //console.log(usuario);

      this.router.navigate(["/admin"]);
    }, error => {
      if(error.status == 400){
        console.log("Error de usuario");
      }
    })
      
  }

}
