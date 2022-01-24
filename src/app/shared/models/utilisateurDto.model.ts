import { Role } from "./role.model";

export interface UtilisateurDto {
    id: number;
    username: string;
    password: string;
    role: Role;
    actif: boolean;
  }