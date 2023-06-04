import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.usuarioService.tokenAlmacenado!==''){
      let reqClonada = req.clone({
        setHeaders: {Authorization: 'Bearer '+this.usuarioService.tokenAlmacenado}
      });
      return next.handle(reqClonada);
    }
    return next.handle(req);
  }


}
