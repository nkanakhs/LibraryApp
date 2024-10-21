import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any): any {
    const dateFormat = new Date(value);
    const newDate = dateFormat.getDate() + '/' + (dateFormat.getMonth()+1) + '/'  + dateFormat.getFullYear() +" - "+ 
                    String(dateFormat.getHours()).padStart(2, '0') +":" + String(dateFormat.getMinutes()).padStart(2, '0')
    return newDate;
  }

}
