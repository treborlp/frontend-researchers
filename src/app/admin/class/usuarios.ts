import { Researcher } from './researcher';

export class Usuarios {
    id:number;
    username:string;
    password:string;
    enabled: boolean;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    email:string;
    researcher: Researcher;
    roles: string[] =[];
}
