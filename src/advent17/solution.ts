
import { ISolution, InputFile, Util, Vec4, Vector4 } from '../shared';

export class PocketDimension {
   cmap: Map<string, Vector4>;

   constructor(input: string[]) {
      this.cmap = new Map<string, Vector4>();
      for (let j = 0; j < input.length; j++) {
         for (let i = 0; i < input[j].length; i++) {
            if (input[j][i] === '#') {
               let pos = new Vector4(i, j, 0, 0);
               this.cmap.set(pos.id(), pos);
            }
         }
      }
   }

   neighbours(pos: Vec4, hyper: boolean): string[] {
      let index = 0;
      let result = new Array(hyper ? 80 : 26);  // 3 ** n minus one
      let kmin = hyper ? -1 : 0;
      let kmax = hyper ? 2 : 1;

      for (let k = kmin; k < kmax; k++) {
         for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
               result[index++] = `${pos.x + j},${pos.y + i},${pos.z - 1},${pos.w + k}`;
               if (i !== 0 || j !== 0 || k !== 0)
                  result[index++] = `${pos.x + j},${pos.y + i},${pos.z},${pos.w + k}`;
               result[index++] = `${pos.x + j},${pos.y + i},${pos.z + 1},${pos.w + k}`;
            }
         }
      }

      return result;
   }

   countNeighbours(pos: Vec4, hyper: boolean): number {
      return this.neighbours(pos, hyper).map(n => this.cmap.has(n)).reduce((a, c) => a + (c ? 1 : 0), 0);
   }

   nextCycle(hyper: boolean) {
      let calcLocs = new Set<string>();

      // Find all locations to calculate
      for (let c of this.cmap.values()) {
         for (let n of this.neighbours(c, hyper)) {
            calcLocs.add(n);
         }
      }

      // Generate the new state
      let newMap = new Map<string, Vector4>();
      for (let calcLoc of calcLocs) {
         let coords = calcLoc.split(',').map(n => +n);
         let cubePos = { x: coords[0], y: coords[1], z: coords[2], w: coords[3] }
         let cubeCt = this.countNeighbours(cubePos, hyper);
         if (cubeCt === 3 || (cubeCt === 2 && this.cmap.has(calcLoc))) {
            newMap.set(calcLoc, new Vector4(cubePos.x, cubePos.y, cubePos.z, cubePos.w));
         }
      }

      this.cmap = newMap;
   }
}

class Solution17 implements ISolution {
   dayNumber: number = 17;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let pd = new PocketDimension(inputFile.readLines());
      for (let i = 0; i < 6; i++) { pd.nextCycle(false); }

      return "" + pd.cmap.size;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let pd = new PocketDimension(inputFile.readLines());
      for (let i = 0; i < 6; i++) { pd.nextCycle(true); }

      return "" + pd.cmap.size;
   }
}

export default new Solution17() as ISolution;
