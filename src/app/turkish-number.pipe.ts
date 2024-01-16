import { Pipe, PipeTransform } from '@angular/core';
import { TurkishNumberService } from './services/turkish-number.service';



@Pipe({
  name: 'turkishNumber'
})
export class TurkishNumberPipe implements PipeTransform {

  constructor(private turkishNumberService: TurkishNumberService) {}

  transform(value: number): string {
    return this.turkishNumberService.convertToText(value);
  }

}
