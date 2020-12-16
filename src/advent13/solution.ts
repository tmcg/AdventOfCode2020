
import { ISolution, InputFile, Util } from '../shared';

export class BusSchedule {
   timestamp: number;
   buses: number[];

   constructor(input: string[]) {
      this.timestamp = +input[0];
      this.buses = input[1].split(',').filter(s => s !== 'x').map(s => +s);
   }

   smallestWait(): number {
      let waitTimes = this.buses.map(b => b - (this.timestamp % b))
      let smallestWait = Math.min(...waitTimes);

      return this.buses[waitTimes.indexOf(smallestWait)] * smallestWait;
   }
}

class Solution13 implements ISolution {
   dayNumber: number = 13;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let s = new BusSchedule(inputFile.readLines());
      return "" + s.smallestWait();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      return "";
   }
}

export default new Solution13() as ISolution;
