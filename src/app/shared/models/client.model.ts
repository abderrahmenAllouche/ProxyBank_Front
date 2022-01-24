import { CompteCourant } from './compteCourant';

export interface Client {
  id: number;
  nom: string;
  preNom: string;
  adresse: string;
  tel: number;
  compteCourant: CompteCourant;
}
