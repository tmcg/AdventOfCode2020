
import { ISolution, InputFile } from '../shared';

class Solution1 implements ISolution {
   dayNumber : number = 1;

   solvePart1() : string {
      const inputFile = new InputFile(this.dayNumber);
      const numbers = inputFile.readLines().map(x => +x);

      return '';
   }

   solvePart2() : string {
      const inputFile = new InputFile(this.dayNumber);
      const numbers = inputFile.readLines().map(x => +x);

      return '';
   }
}

export default new Solution1() as ISolution;
