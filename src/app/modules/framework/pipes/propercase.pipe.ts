import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propercase'
})
export class PropercasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}
