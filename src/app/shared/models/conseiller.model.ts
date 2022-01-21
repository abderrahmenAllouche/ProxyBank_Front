import { Client } from "./client.model";

export interface Conseiller{
    id: number;
    nom: string;
    clients: Client[];
    gerant_id: number;
}