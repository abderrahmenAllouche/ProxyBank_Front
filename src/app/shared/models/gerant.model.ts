import { Conseiller } from './conseiller.model';

export interface Gerant {
  id: number;
  nom: string;
  conseillers: Conseiller[];
  idAgence: number;
}
