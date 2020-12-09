
import { ISolution, InputFile, Util } from '../shared';

type OpCode = 'nop' | 'acc' | 'jmp';

interface IInstruction {
   code: OpCode,
   arg: number,
   hit: boolean,
}

export class ConsoleComputer {
   program: IInstruction[] = [];
   counter: number = 0;
   accumulator: number = 0;

   constructor(input: string[]) {
      this.counter = 0;
      this.accumulator = 0;
      this.program = input.map(a => {
         const inst = a.split(' ');
         return { code: <OpCode>inst[0], arg: +inst[1], hit: false };
      });
   }

   flipJmpNop(index: number) {
      let inst = this.program[index];
      let code = inst.code;
      if (inst.code === 'jmp') code = 'nop';
      if (inst.code === 'nop') code = 'jmp';
      inst.code = code;
   }

   execute(): boolean {
      while (true) {
         if (this.counter < 0 || this.counter >= this.program.length)
            return true; // termination

         if (this.program[this.counter].hit)
            return false; // infinite loop

         let inst = this.program[this.counter];
         inst.hit = true;

         switch (inst.code) {
            case 'nop':
               this.counter++;
               break;
            case 'acc':
               this.accumulator += inst.arg;
               this.counter++;
               break;
            case 'jmp':
               this.counter += inst.arg;
               break;
         }
      }
   }
}

class Solution8 implements ISolution {
   dayNumber: number = 8;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let c = new ConsoleComputer(inputFile.readLines());
      c.execute();
      return "" + c.accumulator;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      const input = inputFile.readLines();

      let flipIndex = 0;
      let accumulator = 0;
      let terminated = false;

      do {
         let c = new ConsoleComputer(input);
         c.flipJmpNop(flipIndex)
         terminated = c.execute();
         accumulator = c.accumulator;
         flipIndex++;
      }
      while (!terminated)

      return "" + accumulator;
   }
}

export default new Solution8() as ISolution;
