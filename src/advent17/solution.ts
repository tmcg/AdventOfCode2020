
import { ISolution, InputFile, Util, Vec3, Vector3 } from '../shared';

export class PocketDimension {
   cmap: Map<string, Vector3>;

   constructor(input: string[]) {
      this.cmap = new Map<string, Vector3>();
      for (let j = 0; j < input.length; j++) {
         for (let i = 0; i < input[j].length; i++) {
            if (input[j][i] === '#') {
               let pos = new Vector3(i, j, 0);
               this.cmap.set(pos.id(), pos);
            }
         }
      }
   }

   neighbours(pos: Vec3): string[] {
      let index = 0;
      let result = new Array(26);
      for (let j = -1; j < 2; j++) {
         for (let i = -1; i < 2; i++) {
            result[index++] = `${pos.x + j},${pos.y + i},${pos.z - 1}`;
            if (i !== 0 || j !== 0)
               result[index++] = `${pos.x + j},${pos.y + i},${pos.z}`;
            result[index++] = `${pos.x + j},${pos.y + i},${pos.z + 1}`;
         }
      }

      return result;
   }

   countNeighbours(pos: Vec3): number {
      return this.neighbours(pos).map(n => this.cmap.has(n)).reduce((a, c) => a + (c ? 1 : 0), 0);
   }

   nextCycle() {
      let calcLocs = new Set<string>();

      // Find all locations to calculate
      for (let c of this.cmap.values()) {
         for (let n of this.neighbours(c)) {
            calcLocs.add(n);
         }
      }

      // Generate the new state
      let newMap = new Map<string, Vector3>();
      for (let calcLoc of calcLocs) {
         let coords = calcLoc.split(',').map(n => +n);
         let cubePos = { x: coords[0], y: coords[1], z: coords[2] }
         let cubeCt = this.countNeighbours(cubePos);
         if (cubeCt === 3 || (cubeCt === 2 && this.cmap.has(calcLoc))) {
            newMap.set(calcLoc, new Vector3(cubePos.x, cubePos.y, cubePos.z));
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
      for(let i = 0; i < 6; i++) { pd.nextCycle(); }

      return "" + pd.cmap.size;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      return "";
   }
}

export default new Solution17() as ISolution;
