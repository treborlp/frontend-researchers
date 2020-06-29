import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/admin/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  username:string;
  nombre:string;
  

  ngOnInit(): void {
    this.username = this.authService.usuario.primerApellido;
    this.nombre = this.authService.usuario.nombre;
  }

  cerrarSesion():void{
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
