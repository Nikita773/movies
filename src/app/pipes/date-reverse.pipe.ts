import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateReverse'
})
export class DateReversePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('-').reverse().join('-');
  }

}
