
import { ISolution, InputFile, Util } from '../shared';

export class XmasEncoder {
   input: number[];
   preamble: number;

   constructor(input: string[], preamble: number) {
      this.input = input.map(n => +n);
      this.preamble = preamble;
   }

   findEncodingError(): number {
      for (let i = this.preamble; i < this.input.length; i++) {
         if (!this.sumIsInWindow(i))
            return this.input[i];
      }
      return 0;
   }

   sumIsInWindow(index: number): boolean {
      let start = index - this.preamble;
      for (let x = start; x < index; x++) {
         for (let y = start; y < index; y++) {
            if (x === y) continue;
            if (this.input[x] + this.input[y] === this.input[index])
               return true;
         }
      }
      return false;
   }

   findEncryptionWeakness(): number {
      let err = this.findEncodingError();

      for (let i = 0; i < this.input.length; i++) {
         let sum = 0;
         let count = 0;
         do {
            sum += this.input[i + count];
            count++;
            if (sum === err) {
               // set is found, sum the smallest and largest
               let set = this.input.slice(i, i + count);
               return Math.min(...set) + Math.max(...set);
            }
         } while (sum < err);
      }
      return 0;
   }
}

class Solution9 implements ISolution {
   dayNumber: number = 9;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let e = new XmasEncoder(inputFile.readLines(), 25)
      return "" + e.findEncodingError();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let e = new XmasEncoder(inputFile.readLines(), 25)
      return "" + e.findEncryptionWeakness();
   }
}

export default new Solution9() as ISolution;
