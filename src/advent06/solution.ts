
import { ISolution, InputFile, Util } from '../shared';

export class DeclarationCalculator {
   groups: string[];

   constructor(input: string[]) {
      this.groups = input.join("|").split("||");
   }

   uniqueQuestions(group: string): number {
      return [...new Set(group.replace(/\|/g, ""))].length;
   }

   universalQuestions(group: string): number {
      let countElems = (src: string[], c: string) => src.filter(a => a === c).length;

      let questions = Util.range(26).map(n => String.fromCharCode(97 + n));
      let answers = [...group].sort();
      let memberCount = countElems(answers, "|") + 1;

      return questions.filter(c => countElems(answers, c) === memberCount).length;
   }

   findSumOfUniqueQuestions(): number {
      return this.groups.map(g => this.uniqueQuestions(g)).reduce((a, c) => a + c);
   }

   findSumOfUniversalQuestions(): number {
      return this.groups.map(g => this.universalQuestions(g)).reduce((a, c) => a + c);
   }
}

class Solution6 implements ISolution {
   dayNumber: number = 6;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let c = new DeclarationCalculator(inputFile.readLines());
      return "" + c.findSumOfUniqueQuestions();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let c = new DeclarationCalculator(inputFile.readLines());
      return "" + c.findSumOfUniversalQuestions();
   }
}

export default new Solution6() as ISolution;
