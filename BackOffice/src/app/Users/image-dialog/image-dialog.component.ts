import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  standalone: false,
  template: ` <!-- Supprimer templateUrl et styleUrl -->
    <div class="image-container">
      <img [src]="data.imageUrl" alt="Document agrandi" class="full-size-image">
    </div>
  `,
  styles: [`
    .image-container {
      max-width: 90vw;
      max-height: 90vh;
      overflow: auto;
      padding: 20px;
      background: rgba(0, 0, 0, 0.9);
    }
    .full-size-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
    }
  `]
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}
