import { Usuarios } from './usuarios';

export class Role {
    id:number;
    nombre:string;
    usuarios: Usuarios[] =[];
}
