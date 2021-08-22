import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCut'
})
export class DateCutPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    return value.slice(0,4);
  }

}
