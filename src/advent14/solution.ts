
import { ISolution, InputFile, Util, Dictionary } from '../shared';

type OpCode = 'mask' | 'mem';
type Instruction = { code: OpCode; mask: string; val1: bigint; val2: bigint; }

export class DockingComputer {
   program: Instruction[] = [];
   memory: Dictionary<bigint> = {};
   counter: number = 0;
   mask: string = '';

   constructor(input: string[]) {
      for (let line of input) {
         let m1 = line.match(/mask = ([01X]+)/);
         let m2 = line.match(/mem\[(\d+)\] = (\d+)/);

         if (m1) this.program.push({ code: 'mask', mask: m1[1], val1: 0n, val2: 0n });
         if (m2) this.program.push({ code: 'mem', mask: '', val1: BigInt(m2[1]), val2: BigInt(m2[2]) });
      }
   }

   sumMemory(): bigint {
      return Object.values(this.memory).reduce((a, c) => a + c, 0n);
   }

   setMemory(addr: bigint, data: bigint) {
      this.memory[""+addr] = data;
   }

   applyMask(n: bigint, mask: string): bigint {
      let maskOr = BigInt('0b' + mask.replace(/X/g, '0'));
      let maskAnd = BigInt('0b' + mask.replace(/X/g, '1'));
      return (n | maskOr) & maskAnd;
   }

   step(rules: number): boolean {
      let inst = this.program[this.counter];

      if (inst.code === 'mask') {
         this.mask = inst.mask;
      }
      if (inst.code === 'mem') {
         if (rules === 1) {
            this.setMemory(inst.val1, this.applyMask(inst.val2, this.mask));
         } else {
            let masks = this.findAllMasks(this.mask);
            for (let mask of masks) {
               this.setMemory(this.applyMask(inst.val1, mask), inst.val2);
            }
         }
      }

      this.counter++;
      return this.counter < this.program.length;
   }

   findAllMasks(mask: string): string[] {
      let xcount = mask.replace(/[01]/g, '').length;
      let result = [];

      // find the combination of all masks to apply
      for (let n = 0; n < 2 ** xcount; n++) {
         let bn = n.toString(2).padStart(xcount, '0');
         let mx = mask.replace(/0/g, ' ');
         for (let m = 0; m < xcount; m++) {
            mx = mx.replace(/X/, bn[m]);
         }
         result.push(mx.replace(/ /g, 'X'));
      }

      return result;
   }
}

class Solution14 implements ISolution {
   dayNumber: number = 14;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let c = new DockingComputer(inputFile.readLines());
      while (c.step(1));
      return "" + c.sumMemory();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let c = new DockingComputer(inputFile.readLines());
      while(c.step(2));
      return "" + c.sumMemory();
   }
}

export default new Solution14() as ISolution;
