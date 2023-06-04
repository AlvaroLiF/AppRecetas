import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import { Receta } from 'src/app/interfaces/recetas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  recetasFavoritas: Receta[] = [];

  constructor(
    private router: Router,
    private recetasService: RecetasService) { }

  ngOnInit() {
    this.recetasFavoritas = this.recetasService.getRecetasFavoritas();
  }

  verDetallesReceta(recetaId: String) {
    this.router.navigate(['/receta-detalles', recetaId]);
  }
}
