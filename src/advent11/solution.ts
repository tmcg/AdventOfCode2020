
import { ISolution, InputFile, Util } from '../shared';

type SeatState = ' ' | '.' | 'L' | '#';

export class SeatingArea {
   rows: SeatState[][];
   width: number;
   height: number;

   constructor(input: string[]) {
      this.rows = input.map(s => s.split('').map(t => <SeatState>t));
      this.width = this.rows[0].length;
      this.height = this.rows.length;
   }

   occupiedSeats(): number {
      let count = 0;
      for (let y = 0; y < this.height; y++) {
         for (let x = 0; x < this.width; x++) {
            count += this.rows[y][x] === '#' ? 1 : 0;
         }
      }
      return count;
   }

   getSeat(x: number, y: number): SeatState {
      if (x < 0 || x >= this.width || y < 0 || y >= this.height)
         return ' ';
      return <SeatState>(this.rows[y][x]);
   }

   occupiedCount(x: number, y: number, rules: number): number {
      return (this.occupiedTrace(x, y, -1, -1, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, -1, 0, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, -1, 1, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, 0, -1, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, 0, 1, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, 1, -1, rules) ? 1 : 0) +
         (this.occupiedTrace(x, y, 1, 0, rules)  ? 1 : 0) +
         (this.occupiedTrace(x, y, 1, 1, rules) ? 1 : 0)
   }

   occupiedTrace(x: number, y: number, xd: number, yd: number, rules: number): boolean {
      if (rules === 1)
         return this.getSeat(x + xd, y + yd) === '#';

      let cx = x, cy = y, result = '.';
      do {
         cx += xd;
         cy += yd;
         result = this.getSeat(cx, cy);
      } while (result === '.');
      return result === '#';
   }

   nextState(x: number, y: number, rules: number): SeatState {
      let currentState = this.rows[y][x];
      if (currentState === '.')
         return currentState;

      let count = this.occupiedCount(x, y, rules);
      if (currentState === 'L' && count === 0)
         return '#';
      if (currentState === '#' && count >= (3 + rules))
         return 'L';

      return currentState;
   }

   nextRound(rules: number): number {
      let result = this.rows.map(s => s.map(t => t));
      let changed = 0;

      for (let y = 0; y < this.height; y++) {
         for (let x = 0; x < this.width; x++) {
            let currState = this.rows[y][x];
            let nextState = this.nextState(x, y, rules);
            if (currState !== nextState) {
               result[y][x] = nextState;
               changed++;
            }
         }
      }

      this.rows = result;
      return changed;
   }
}

class Solution11 implements ISolution {
   dayNumber: number = 11;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let a = new SeatingArea(inputFile.readLines());
      while(a.nextRound(1) > 0);

      return "" + a.occupiedSeats();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let a = new SeatingArea(inputFile.readLines());
      while(a.nextRound(2) > 0);

      return "" + a.occupiedSeats();
   }
}

export default new Solution11() as ISolution;
