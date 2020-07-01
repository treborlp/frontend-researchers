import { Researcher } from './researcher';
import { Role } from './role';

export class Usuarios {
    id:number;
    username:string;
    password:string;
    enabled: boolean;
    nombre: string;
    telefono: string;
    primerApellido: string;
    segundoApellido: string;
    email:string;
    roles: Role[] =[];
}
