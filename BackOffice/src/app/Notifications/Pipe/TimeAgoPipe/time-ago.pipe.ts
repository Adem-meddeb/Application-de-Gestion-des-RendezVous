import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    
    const date = typeof value === 'string' ? new Date(value) : value;
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const intervals = {
      an: 31536000,
      mois: 2592000,
      jour: 86400,
      heure: 3600,
      minute: 60,
      seconde: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return unit === 'mois' 
          ? `Il y a ${interval} mois`
          : `Il y a ${interval} ${unit}${interval > 1 ? 's' : ''}`;
      }
    }

    return 'À l\'instant';
  }
}
