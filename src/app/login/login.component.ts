import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../shared/service/auth.service";
import {UtilisateurAuth} from "../shared/models/utilisateur-auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UtilisateurAuth = {username: '', password: ''};
  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  get fLogin() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.user)
      window.alert('bienvenue '+this.user.username);
      this.authService.login(this.user).subscribe(res => {
        console.log(res)
        if (res) {
          this.router.navigateByUrl('/home');
        }
      })
    }
  }
}
