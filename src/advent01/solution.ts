
import { ISolution, InputFile } from '../shared';

class Solution1 implements ISolution {
   dayNumber : number = 1;

   solvePart1() : string {
      const inputFile = new InputFile(this.dayNumber);
      const numbers = inputFile.readLines().map(x => +x);

      for (let n1 of numbers)
         for (let n2 of numbers)
            if (n1 + n2 == 2020)
               return ""+(n1 * n2);

      return '';
   }

   solvePart2() : string {
      const inputFile = new InputFile(this.dayNumber);
      const numbers = inputFile.readLines().map(x => +x);

      for (let n1 of numbers)
         for (let n2 of numbers)
            for (let n3 of numbers)
               if (n1 + n2 + n3 == 2020)
                  return ""+(n1 * n2 * n3);

      return '';
   }
}

export default new Solution1() as ISolution;
