
import { ISolution, InputFile, Util, Compass, CompassTurn, IPosition, CompassFromCode } from '../shared';

export class FerryInstruction {
   action: string;
   value: number;

   constructor(input: string) {
      this.action = input[0];
      this.value = +input.slice(1);
   }
}

export class Ferry {
   position: IPosition;
   waypoint: IPosition;
   direction: Compass;
   instructions: FerryInstruction[];

   constructor(input: string[]) {
      this.position = { x: 0, y: 0 };
      this.waypoint = { x: 10, y: 1 };
      this.direction = Compass.East;
      this.instructions = input.map(s => new FerryInstruction(s));
   }

   processPart1(inst: FerryInstruction) {
      if (inst.action === 'L' || inst.action === 'R') {
         let turns = Math.floor(inst.value / 90);
         while (turns > 0) {
            this.direction = CompassTurn(this.direction, inst.action === 'L');
            turns--;
         }
         return;
      }

      let dir = inst.action === 'F' ? this.direction : CompassFromCode(inst.action);
      if (dir === Compass.North) this.position.y += inst.value;
      if (dir === Compass.South) this.position.y -= inst.value;
      if (dir === Compass.East) this.position.x += inst.value;
      if (dir === Compass.West) this.position.x -= inst.value;
   }

   processPart2(inst: FerryInstruction) {
      if (inst.action === 'L' || inst.action === 'R') {
         let turns = Math.floor(inst.value / 90);

         while (turns > 0) {
            let wx = this.waypoint.y * (inst.action === 'L' ? -1 : 1);
            let wy = this.waypoint.x * (inst.action === 'R' ? -1 : 1);
            this.waypoint.x = wx;
            this.waypoint.y = wy;
            turns--;
         }
         return;
      }

      if (inst.action === 'F') {
         this.position.x += (inst.value * this.waypoint.x);
         this.position.y += (inst.value * this.waypoint.y);
         return;
      }

      let dir = CompassFromCode(inst.action);
      if (dir === Compass.North) this.waypoint.y += inst.value;
      if (dir === Compass.South) this.waypoint.y -= inst.value;
      if (dir === Compass.East) this.waypoint.x += inst.value;
      if (dir === Compass.West) this.waypoint.x -= inst.value;
   }

   processAll(rules: number): number {
      for(let inst of this.instructions) {
         if (rules === 1) {
            this.processPart1(inst);
         } else {
            this.processPart2(inst);
         }
      }

      return Math.abs(this.position.x) + Math.abs(this.position.y);
   }
}

class Solution12 implements ISolution {
   dayNumber: number = 12;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let f = new Ferry(inputFile.readLines());
      return "" + f.processAll(1);
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let f = new Ferry(inputFile.readLines());
      return "" + f.processAll(2);
   }
}

export default new Solution12() as ISolution;
