import { Gerant } from "./gerant.model";

export interface Agence{
    
    id: number;
    dateCreation:Date;
    numeroIdentification: number;
    gerant: Gerant;
    nom: string;
   
   
    
}