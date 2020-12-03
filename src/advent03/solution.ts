
import { isForStatement } from 'typescript';
import { ISolution, InputFile } from '../shared';

export class Forest {
   area: string[];
   width: number;
   height: number;

   constructor(input: string[]) {
      this.area = input;
      this.height = this.area.length;
      this.width = this.area[0].length;
   }

   treeAt(x: number, y: number): boolean {
      return this.area[y][x % this.width] === '#';
   }

   countTrees(slopeRight: number, slopeDown: number): number {
      let j = 0, i = 0, count = 0;
      while (j < this.height) {
         if (this.treeAt(i, j))
            count++;
         i += slopeRight;
         j += slopeDown;
      }

      return count;
   }
}

class Solution3 implements ISolution {
   dayNumber: number = 3;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let f = new Forest(inputFile.readLines());
      return "" + f.countTrees(3, 1);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let f = new Forest(inputFile.readLines());
      let p = [{x: 1, y: 1},{x: 3, y: 1},{x: 5, y: 1},{x: 7, y: 1},{x: 1, y: 2}];
      return ""+p.map(t => f.countTrees(t.x, t.y)).reduce((a,c) => a * c, 1);
   }
}

export default new Solution3() as ISolution;
