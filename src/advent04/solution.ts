
import { ISolution, InputFile } from '../shared';

export class PassportScanner {
   passports: string[][];

   constructor(input: string[]) {
      this.passports = input.join(" ").split("  ").map(a => a.split(" "));
   }

   isPassportValidPart1(passport: string[]): boolean {
      let keys = passport.map(v => v.split(":")[0]).sort();
      let fields = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
      return fields.filter(f => !keys.includes(f)).length === 0;
   }

   getField(passport: string[], name: string): string {
      return passport.filter(p => p.startsWith(name)).map(p => p.replace(name + ":", "").trim()).concat([""])[0];
   }

   birthYearValid(passport: string[]): boolean {
      let byr = this.getField(passport, "byr");
      return byr >= "1920" && byr <= "2002";
   }

   issueYearValid(passport: string[]): boolean {
      let iyr = this.getField(passport, "iyr");
      return iyr >= "2010" && iyr <= "2020";
   }

   expiryYearValid(passport: string[]): boolean {
      let eyr = this.getField(passport, "eyr");
      return eyr >= "2020" && eyr <= "2030";
   }

   heightValid(passport: string[]): boolean {
      let hgt = this.getField(passport, "hgt");
      let hgtcm = hgt.endsWith("cm") ? hgt.replace("cm","") : "";
      let hgtin = hgt.endsWith("in") ? hgt.replace("in","") : "";
      return (hgtcm >= "150" && hgtcm <= "193") || (hgtin >= "59" && hgtin <= "76");
   }

   hairColorValid(passport: string[]): boolean {
      let hcl = this.getField(passport, "hcl");
      return hcl.match('^#[0-9a-f]{6}$')?.length! > 0;
   }

   eyeColorValid(passport: string[]): boolean {
      let ecl = this.getField(passport, "ecl");
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
   }

   identifierValid(passport: string[]): boolean {
      let pid = this.getField(passport, "pid");
      return pid.match('^[0-9]{9}$')?.length! > 0;
   }

   isPassportValidPart2(passport: string[]): boolean {
      return this.birthYearValid(passport) &&
         this.issueYearValid(passport) &&
         this.expiryYearValid(passport) &&
         this.heightValid(passport) &&
         this.hairColorValid(passport) &&
         this.eyeColorValid(passport) &&
         this.identifierValid(passport);
   }
}

class Solution4 implements ISolution {
   dayNumber: number = 4;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let s = new PassportScanner(inputFile.readLines());
      return "" + s.passports.filter(p => s.isPassportValidPart1(p)).length;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);
      //const numbers = inputFile.readLines().map(x => +x);

      let s = new PassportScanner(inputFile.readLines());
      return "" + s.passports.filter(p => s.isPassportValidPart2(p)).length;
   }
}

export default new Solution4() as ISolution;
