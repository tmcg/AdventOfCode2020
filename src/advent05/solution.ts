
import { ISolution, InputFile } from '../shared';

export class BinaryPlane {
   seatNums: number[];

   constructor(input: string[]) {
      this.seatNums = input.map(s => this.findSeatNumber(s));
   }

   findSeatNumber(code: string): number
   {
      return parseInt(code.replace(/[FL]/g,'0').replace(/[BR]/g,'1'),2);
   }

   findMaxSeatNumber(): string
   {
      return ""+Math.max(...this.seatNums);
   }

   findMissingSeatNumber(): string
   {
      let sorted = this.seatNums.sort((a,b) => a-b);
      for(let i = 0; i < sorted.length; i++)
      {
         if (sorted[i+1] === sorted[i]+2)
            return ""+(sorted[i] + 1);
      }
      return "";
   }
}

class Solution5 implements ISolution {
   dayNumber: number = 5;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let bp = new BinaryPlane(inputFile.readLines());
      return bp.findMaxSeatNumber();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let bp = new BinaryPlane(inputFile.readLines());
      return bp.findMissingSeatNumber();
   }
}

export default new Solution5() as ISolution;
