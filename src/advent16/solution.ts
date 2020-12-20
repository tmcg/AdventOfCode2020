
import { ISolution, InputFile, Util } from '../shared';

export class Ticket {
   nums: number[] = [];
   constructor(input: string) {
      this.nums = input.split(',').map(n => +n);
   }
}

export class TicketField {
   name: string;
   rg: number[];

   constructor(input: string) {
      let x = input.split(':');
      this.name = x[0];
      this.rg = x[1].replace(' or ', '-').split('-').map(n => +n);
   }

   inRange(n: number): boolean {
      return (n >= this.rg[0] && n <= this.rg[1]) || (n >= this.rg[2] && n <= this.rg[3]);
   }
}

export class TicketScanner {
   fields: TicketField[];
   yourTicket: Ticket;
   nearTickets: Ticket[];

   constructor(input: string[]) {
      this.fields = input.filter(s => s.includes(':') && s.includes(' or ')).map(s => new TicketField(s));
      let yourIndex = input.findIndex(s => s === 'your ticket:');
      let nearIndex = input.findIndex(s => s === 'nearby tickets:');
      this.yourTicket = new Ticket(input[yourIndex + 1]);
      this.nearTickets = input.filter((v, i) => i > nearIndex).map(s => new Ticket(s));
   }

   validTickets(): Ticket[] {
      return this.nearTickets.filter(t => this.invalidFields(t).length === 0);
   }

   invalidFields(t: Ticket): number[] {
      let result: number[] = [];
      for (let num of t.nums) {
         let valid = false;
         for (let f of this.fields) {
            if (f.inRange(num)) {
               valid = true;
               break;
            }
         }
         if (!valid)
            result.push(num);
      }
      return result;
   }

   scanErrorRate(): number {
      return this.nearTickets
         .map(t => this.invalidFields(t).reduce((a, c) => a + c, 0))
         .reduce((a, c) => a + c, 0);
   }

   validFields(tickets: Ticket[], ix: number): string[] {
      let result = [];
      let nums = tickets.map(t => t.nums[ix]);

      for (let f of this.fields) {
         let valid = true;
         for (let num of nums) {
            if (!f.inRange(num)) {
               valid = false;
               break;
            }
         }
         if (valid)
            result.push(f.name);
      }

      return result;
   }

   findDepartureFields(): number {
      let validTickets = this.validTickets();
      let validFields = this.yourTicket.nums.map((_, i) => this.validFields(validTickets, i));

      //validFields.forEach((v,i) => console.log(`${i} ${validFields[i]}`));

      // narrow the valid fields by eliminating duplicates
      while (validFields.filter(f => f.length > 1).length > 0) {
        let singles = validFields.filter(f => f.length === 1).map(f => f[0]);
        for (let i = 0; i < validFields.length; i++) {
            if (validFields[i].length < 2) { continue; }
            validFields[i] = validFields[i].filter(f => !singles.includes(f));
         }
      }

      //validFields.forEach((v,i) => console.log(`${i} ${validFields[i]}`));

      return validFields
         .map((v,i) => v[0].startsWith('departure') ? this.yourTicket.nums[i] : 1)
         .reduce((a,c) => a * c, 1)
   }
}

class Solution16 implements ISolution {
   dayNumber: number = 16;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let s = new TicketScanner(inputFile.readLines());
      return "" + s.scanErrorRate();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let s = new TicketScanner(inputFile.readLines());
      return "" + s.findDepartureFields();
   }
}

export default new Solution16() as ISolution;
