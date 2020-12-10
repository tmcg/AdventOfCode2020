
import { ISolution, InputFile, Util } from '../shared';

export class AdapterArray {
   joltages: number[];

   constructor(input: string[]) {
      let sorted = input.map(n => +n).sort((a, b) => a - b);
      this.joltages = [0, ...sorted, Math.max(...sorted) + 3]
   }

   findJoltagePath(): number[] {
      let lastValue = 0;
      let jumps: number[] = [];
      for(let rating of this.joltages)
      {
         jumps.push(rating - lastValue);
         lastValue = rating;
      }
      return jumps
   }

   findAllJoltagePaths(): number {
      let paths: number[] = this.joltages.map(k => k === 0 ? 1 : 0);

      for(let itemIndex = 0; itemIndex < this.joltages.length; itemIndex++)
         for(let pathIndex = itemIndex + 1; pathIndex <= itemIndex + 3; pathIndex++)
            if (this.joltages[pathIndex] <= this.joltages[itemIndex] + 3)
               paths[pathIndex] = paths[pathIndex] + paths[itemIndex];

      //console.log(paths);
      return paths.pop()!;
   }
}

class Solution10 implements ISolution {
   dayNumber: number = 10;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let a = new AdapterArray(inputFile.readLines());
      let path = a.findJoltagePath();
      return "" + (path.filter(f => f === 1).length * path.filter(f => f === 3).length);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      return "" + new AdapterArray(inputFile.readLines()).findAllJoltagePaths();;
   }
}

export default new Solution10() as ISolution;
