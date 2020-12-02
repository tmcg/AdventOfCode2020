
import { ISolution, InputFile } from '../shared';

export class PasswordEntry {
   policyMin: number;
   policyMax: number;
   policyChar: string;
   password: string;

   constructor(input: string)
   {
      let re = input.match(/([0-9]+)-([0-9]+) ([a-z]+): ([a-z]+)/)!;
      this.policyMin = +re[1];
      this.policyMax = +re[2];
      this.policyChar = re[3];
      this.password = re[4]
   }

   policyCharCount(): number {
      return this.password.split('').filter(c => c === this.policyChar).length;
   }

   meetsPolicy1(): boolean {
      let count = this.policyCharCount();
      return count >= this.policyMin && count <= this.policyMax;
   }

   meetsPolicy2(): boolean {
      let ch1 = this.password[this.policyMin-1];
      let ch2 = this.password[this.policyMax-1];
      return (ch1 === this.policyChar || ch2 === this.policyChar) && ch1 != ch2;
   }
}

class Solution2 implements ISolution {
   dayNumber: number = 2;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let entries = inputFile.readLines().map(s => new PasswordEntry(s));
      return ""+entries.filter(e => e.meetsPolicy1()).length;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let entries = inputFile.readLines().map(s => new PasswordEntry(s));
      return ""+entries.filter(e => e.meetsPolicy2()).length;
   }
}

export default new Solution2() as ISolution;
