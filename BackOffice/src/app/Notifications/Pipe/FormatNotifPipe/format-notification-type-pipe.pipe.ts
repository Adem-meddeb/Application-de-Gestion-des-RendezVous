import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNotificationType',
  standalone: false
})
export class FormatNotificationTypePipe implements PipeTransform {

  transform(value: string): string {
    return value.toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

}

