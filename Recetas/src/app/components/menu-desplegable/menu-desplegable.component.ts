import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.scss'],
})
export class MenuDesplegableComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() { }

  closeMenu() {
    this.menuCtrl.close();
  }

  login() {
    this.router.navigate(['home/login']);
  }

  registro() {
    this.router.navigate(['home/registro']);
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['home/login']);
  }
}
