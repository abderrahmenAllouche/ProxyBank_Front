import { CarteElectron } from './carteElectron.model';
import { CarteVisa } from './carteVisa.model';
import { CompteCourant } from './compteCourant.model';
import { CompteEpargne } from './compteEpargne.model';

export interface Client {
  id: number;
  nom: string;
  preNom: string;
  adresse: string;
  tel: number;
  carteElectron: CarteElectron;
  carteVisa: CarteVisa;
  idConseiller: number;
  compteCourant: CompteCourant;
  compteEpargne: CompteEpargne;
}
