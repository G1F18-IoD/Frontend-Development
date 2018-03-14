import { Injectable } from '@angular/core';

@Injectable()
export class CommonFunctionsService {

  constructor() { }

  public shuffleArray(array, loopTimes = 10) {
    /*if(loopTimes == 'undefined') {
      loopTimes = 10;
    }*/
    for(let x = 0; x < loopTimes; x++) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

  }

}
