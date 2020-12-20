
import { ISolution, InputFile, Util, Dictionary } from '../shared';

export class MemoryGame {
   memory: number[][];
   input: number[];
   lastNumber: number;
   lastIndex: number;

   constructor(input: number[], capacity: number) {
      this.input = input;
      this.memory = new Array(capacity);
      input.forEach((n, i) => this.addMemory(n, i + 1));
      this.lastNumber = input[input.length - 1];
      this.lastIndex = input.length;
   }

   getMemory(n: number) {
      return this.memory[n] || [];
   }

   addMemory(n: number, pos: number) {
      let x = this.getMemory(n);
      if (x.length === 0)
         this.memory[n] = [pos];
      if (x.length >= 1)
         this.memory[n] = [x[x.length - 1], pos];
   }

   nextNumber(): number {
      let mem = this.getMemory(this.lastNumber);
      let idx = this.lastIndex + 1;
      let num = 0;
      if (mem.length >= 2) {
         num = mem[mem.length - 1] - mem[mem.length - 2];
      }
      this.addMemory(num, idx);

      this.lastNumber = num;
      this.lastIndex = idx;
      return num;
   }

   findSpoken(): number {
      while (this.lastIndex < this.memory.length) {
         this.nextNumber();
      }
      return this.lastNumber;
   }
}

class Solution15 implements ISolution {
   dayNumber: number = 15;

   solvePart1(): string {
      let g = new MemoryGame([0, 20, 7, 16, 1, 18, 15], 2020);
      return "" + g.findSpoken();
   }

   solvePart2(): string {
      let g = new MemoryGame([0, 20, 7, 16, 1, 18, 15], 30000000);
      return "" + g.findSpoken();
   }
}

export default new Solution15() as ISolution;
