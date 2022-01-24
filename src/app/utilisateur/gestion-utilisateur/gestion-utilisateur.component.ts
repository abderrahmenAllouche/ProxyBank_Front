import { Component, OnInit } from '@angular/core';
import { NewUtilisateur } from 'src/app/shared/models/newUtilisateur.model';
import { Role } from 'src/app/shared/models/role.model';
import { UtilisateurDto } from 'src/app/shared/models/utilisateurDto.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css']
})
export class GestionUtilisateurComponent implements OnInit {
  public utilisateurs!: Array<UtilisateurDto>;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.getUtilisateur()
  }

  getUtilisateur() {
    this.authService.getAll().subscribe(
      (data) => {
        this.utilisateurs = data;
      },
      (error) => {
      }
    );
  }

}
