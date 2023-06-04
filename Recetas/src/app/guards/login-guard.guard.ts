import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService) {

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const tokenValido = this.usuarioService.renewToken();
    return tokenValido;
  }
}
