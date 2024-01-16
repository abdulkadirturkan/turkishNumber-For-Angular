import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurkishNumberService {

  private units: string[] = ['', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz'];
  private tens: string[] = ['', 'On', 'Yirmi', 'Otuz', 'Kırk', 'Elli', 'AltMış', 'Yetmiş', 'Seksen', 'Doksan'];

  convertToText(value: number, includeLira: boolean = true): string {
    if (value < 0 || value > 999999999) {
      return 'Geçersiz';
    }

    if (value === 0) {
      return 'Sıfır';
    }

    let result = '';

    const integerPart = Math.floor(value);
    const fractionalPart = Math.round((value - integerPart) * 100);

    if (integerPart > 0) {
      result += this.calculateIntegerPart(integerPart, includeLira);

      if (fractionalPart > 0) {
        if (includeLira) {
          result += ' ';
        }
      }
    }

    if (fractionalPart > 0) {
      result += this.calculateFractionalPart(fractionalPart);
    }

    result = result.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return result.trim();
  }

  private calculateIntegerPart(value: number, includeLira: boolean): string {
    let result = '';

    const millions = Math.floor(value / 1000000);
    if (millions > 0) {
      result += this.convertToText(millions, false) + ' Milyon ';
    }

    const thousands = Math.floor((value % 1000000) / 1000);
    if (thousands > 0) {
      if (thousands === 1) {
        result += 'Bin ';
      } else {
        result += this.convertToText(thousands, false) + ' Bin ';
      }
    }

    const remainder = value % 1000;
    const hundreds = Math.floor(remainder / 100);
    if (hundreds > 0) {
      result += (hundreds === 1 ? 'Yüz' : this.units[hundreds] + ' Yüz') + ' ';
    }

    const lastTwoDigits = remainder % 100;
    if (lastTwoDigits > 0) {
      if (lastTwoDigits < 10) {
        result += this.units[lastTwoDigits];
      } else if (lastTwoDigits < 20) {
        result += 'On ' + this.units[lastTwoDigits - 10];
      } else {
        const tensDigit = Math.floor(lastTwoDigits / 10);
        const unitsDigit = lastTwoDigits % 10;
        result += this.tens[tensDigit] + (unitsDigit > 0 ? ' ' + this.units[unitsDigit] : '');
      }
    }

    if (includeLira && value % 1 === 0) {
      result += ' Lira ';
    }

    return result;
  }

  private calculateFractionalPart(value: number): string {
    const formattedValue = value.toString().padStart(2, '0');

    if (parseInt(formattedValue) > 9) {
      return this.convertToText(parseInt(formattedValue), false) + ' Kuruş';
    } else {
      return this.units[parseInt(formattedValue)] + ' Kuruş';
    }
  }
}
