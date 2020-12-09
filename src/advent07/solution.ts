
import { ISolution, InputFile, Util } from '../shared';

interface BagContents {
   [name: string]: number
}

interface BagRules {
   [name: string]: BagContents
}

export class LuggageProcessor {
   rules: BagRules = {};

   constructor(input: string[]) {
      input.forEach(line => {
         const rule = LuggageProcessor.parseRule(line);
         this.rules[rule[0]] = rule[1];
      });
   }

   static parseRule(input: string): [string, BagContents] {
      let clean = input.replace(/bags?/g, '').replace('.', '').replace('contain', ',');
      let tokens = clean.split(',').map(s => s.trim()).filter(e => e !== 'no other');

      let name = tokens[0];
      let contents: BagContents = {};
      tokens.slice(1)
         .map(e => e.match(/(\d+)\s(.+)/)!)
         .forEach(m => contents[m[2]] = +m[1]);

      return [name, contents];
   }

   includesBag(name: string, search: string): boolean {
      let contents = this.rules[name];

      for (let key in contents)
         if (key === search || this.includesBag(key, search))
            return true;

      return false;
   }

   findBagsContaining(search: string): number {
      return Object.keys(this.rules).filter(r => this.includesBag(r, search)).length;
   }

   findBagsTotalCount(name: string): number {
      let contents = this.rules[name];

      let count = 0;
      for (let key in contents)
         count += contents[key] + (contents[key] * this.findBagsTotalCount(key));

      return count;
   }
}

class Solution7 implements ISolution {
   dayNumber: number = 7;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let p = new LuggageProcessor(inputFile.readLines());
      return "" + p.findBagsContaining('shiny gold');
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let p = new LuggageProcessor(inputFile.readLines());
      return "" + p.findBagsTotalCount('shiny gold');
   }
}

export default new Solution7() as ISolution;
