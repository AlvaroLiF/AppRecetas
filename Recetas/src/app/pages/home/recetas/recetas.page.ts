import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { RecetaCrud } from 'src/app/interfaces/RecetasCrud';
import { Receta } from 'src/app/interfaces/recetas';
import { RecetasService } from 'src/app/services/recetas.service';
import { RecetasCrudService } from 'src/app/services/recetasCrud.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {
  recetas: Receta[] = [];
  recetasCrud: RecetaCrud[] = [];
  recetasStorage: Receta [] = [];

  constructor(
    private router: Router,
    private recetasService: RecetasService,
    private recetasCrudService : RecetasCrudService
  ) {}

  ngOnInit(): void {
    this.recetasService
      .getRecetas()
      .pipe(
        tap((recetas: Receta[]) => {
          this.recetas = recetas;
        })
      )
      .subscribe();

      this.recetasService
      .getRecetasStorage()
      .pipe(
        tap((recetas: Receta[]) => {
          this.recetasStorage = recetas;
        })
      )
      .subscribe();

      this.recetasCrudService.obtenerTodasLasRecetas().subscribe(
        (response) => {
          this.recetasCrud = response.data;
          console.log(this.recetasCrud);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  

  verDetallesReceta(recetaId: String) {
    this.router.navigate(['/receta-detalles', recetaId]);
  }

  esFavorito(receta: Receta): boolean {
    return this.recetasService.esRecetaFavorita(receta);
  }

  toggleFavorito(receta: Receta) {
    if (this.esFavorito(receta)) {
      this.recetasService.eliminarRecetaFavorita(receta);
    } else {
      this.recetasService.agregarRecetaFavorita(receta);
    }
  }

}
