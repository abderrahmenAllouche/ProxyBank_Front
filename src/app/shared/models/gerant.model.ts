import { Conseiller } from "./conseiller.model";

export interface Gerant{
     id: number;
    nom: string;
    conseillers: Conseiller[];
    agence_id : number;
   
}