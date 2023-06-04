import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas.service';
import { Receta } from 'src/app/interfaces/recetas';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RecetasCrudService } from 'src/app/services/recetasCrud.service';
import { RecetaCrud } from 'src/app/interfaces/RecetasCrud';
import { error } from 'console';

@Component({
  selector: 'app-anadir-receta',
  templateUrl: './add-receta.page.html',
  styleUrls: ['./add-receta.page.scss'],
})
export class AddRecetaPage implements OnInit {

  public mostrarImagen: boolean = false;

  ingredients: string[] = [];
  ingredientsCount: number = 0;
  steps: string[] = [];
  nuevaReceta: RecetaCrud = {
    _id: '',
    title: '',
    imageUrl: '',
    cookingTime: 0,
    ingredients: [],
    ingredientsCount: 0,
    steps: [],
  };

  constructor(
    private recetasService: RecetasService,
    private recetasCrudService: RecetasCrudService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  agregarIngrediente() {
    this.ingredients.push('');
    this.actualizarIngredientsCount();
  }

  eliminarIngrediente(index: number) {
    this.ingredients.splice(index, 1);
    this.actualizarIngredientsCount();
  }

  actualizarIngredientsCount() {
    this.ingredientsCount = this.ingredients.length;
  }

  agregarPaso() {
    this.steps.push('');
  }

  eliminarPaso(index: number) {
    this.steps.splice(index, 1);
  }

  agregarReceta() {
    //this.nuevaReceta.id = this.recetasService.generarId();
    this.nuevaReceta.ingredientsCount = this.ingredientsCount;
    this.nuevaReceta.ingredients = this.ingredients;
    this.nuevaReceta.steps = this.steps;

    // Validar que el título no esté vacío
    if (this.nuevaReceta.title.trim() === '') {
      // Mostrar un mensaje de error o realizar alguna acción apropiada
      console.error('El título de la receta es obligatorio');
      return;
    }

    // Validar que la imagen no esté vacía
    if (this.nuevaReceta.imageUrl.trim() === '') {
      console.error('La URL de la imagen es obligatoria');
      return;
    }

    // Validar que el tiempo de preparación sea un número positivo
    if (this.nuevaReceta.cookingTime <= 0) {
      console.error('El tiempo de preparación debe ser mayor a cero');
      return;
    }

    // Validar que haya al menos un ingrediente
    if (this.nuevaReceta.ingredients.length === 0) {
      console.error('Debe agregar al menos un ingrediente');
      return;
    }

    // Validar que haya al menos un paso
    if (this.nuevaReceta.steps.length === 0) {
      console.error('Debe agregar al menos un paso');
      return;
    }

    // Si todas las validaciones pasan, puedes proceder a agregar la receta
    //this.recetasService.agregarReceta(this.nuevaReceta);
    this.recetasCrudService.nuevaReceta(this.nuevaReceta).subscribe((Response) => {
      console.log(Response);
    },
    (error) =>{
      console.error(error);
    }
    );
    console.log(this.nuevaReceta);

    this.nuevaReceta = {
      _id: '',
      title: '',
      imageUrl: '',
      cookingTime: 0,
      ingredients: [],
      ingredientsCount: 0,
      steps: []

    };

    this.ingredients = [];
    this.steps = [];
    this.ingredientsCount = 0;

  }

  async tomarFoto() {
    const hayPermiso = await Camera.checkPermissions();
    if (hayPermiso.camera) {
      try {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
          quality: 90,
          allowEditing: false,
          saveToGallery: true
        });

        // Asignar la imagen capturada a la propiedad imageUrl de la receta
        if (image && image.dataUrl) {
          this.nuevaReceta.imageUrl = image.dataUrl;
          this.mostrarImagen = true;
        }
      } catch (error) {
        console.error('Error al tomar foto:', error);
      }
    }
  }

  async seleccionarFoto() {
    const hayPermiso = await Camera.checkPermissions();
    if (hayPermiso.camera) {
      try {
        const image = await Camera.getPhoto({
          source: CameraSource.Photos,
          resultType: CameraResultType.DataUrl,
          quality: 90
        });

        // Obtener la imagen capturada en formato de Data URL
        const imageUrl = image && image.dataUrl;

        if (imageUrl) {
          this.nuevaReceta.imageUrl = imageUrl;
          this.mostrarImagen = true;
        }
      } catch (error) {
        console.error('Error al seleccionar foto', error);
      }
    }
  }


}