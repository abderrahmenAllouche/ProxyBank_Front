import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getUserFromLocalStorage(): Utilisateur {
    if (localStorage.getItem('isConnected')) {
      if (localStorage.getItem('current_user') !== null) {
        let userStorage: null | string = localStorage.getItem('current_user');
        let utilisateur: string =
          userStorage != null ? userStorage.toString() : '';
        return JSON.parse(utilisateur);
      }
      return {
        id: 0,
        username: '',
        password: '',
        role: '',
        actif: false,
      };
    }
    return {
      id: 0,
      username: '',
      password: '',
      role: '',
      actif: false,
    };
  }

  isConnected(): boolean {
    let connected: null | string = localStorage.getItem('isConnected');
    connected = connected != null ? connected.toString() : 'false';

    switch (connected) {
      case 'false':
        return false;
      case 'true':
        return true;
      default:
        return false;
    }
  }
}
