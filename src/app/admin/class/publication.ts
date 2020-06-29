import { Researcher } from './researcher';

export class Publication {
    id: number;
    authors: string;
    title:string;
    journal:string;
    type:string;
    doiUrl:string;
    researcher: Researcher;
}
