// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: false
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 100, completeWords = true, ellipsis = '...'): string {
    if (!value) return ''; // Ajouter cette ligne
    if (value.length <= limit) return value;

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
      if (limit === -1) limit = 100; // Gestion du cas où il n'y a pas d'espace
    }
    
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}