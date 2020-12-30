
import { ISolution, InputFile, Util } from '../shared';

type Token = '(' | ')' | '+' | '*' | number;
type TokenOrSub = Token | TokenOrSub[];

export class ExpressionSolver {
   expr: TokenOrSub[];

   constructor(input: string) {
      this.expr = this.parse(this.lex(input));
   }

   lex(input: string): Token[] {
      return input.split('').map(e => e.trim()).filter(e => e).map(e => <Token>e);
   }

   parse(input: Token[]): TokenOrSub[] {
      let result: TokenOrSub[] = [];

      while (true) {
         if (input.length === 0)
            return result;

         let ch = input.shift()!;
         if (ch === ')') {
            return result;
         }

         if (ch === '(') {
            result.push(this.parse(input));
         } else if (ch === '+' || ch === '*') {
            result.push(ch);
         } else {
            result.push(+ch);
         }
      }
   }

   calcExpr(rules: number): number {
      return this.calc(this.expr, rules);
   }

   calc(expr: TokenOrSub[], rules: number): number {

      let basic = expr.map(e => {
         if (typeof (e) !== 'string' && typeof (e) !== 'number') {
            return this.calc(<TokenOrSub[]>e, rules);
         }
         return <Token>e;
      });

      if (rules === 1) {
         // Addition and multiplication in any order
         while (basic.length > 1) {
            basic.splice(0, 3, eval(basic.slice(0, 3).join('')));
         }
      } else {
         // Addition first then multiplication
         let processOp = (op: Token) => {
            let ix = basic.indexOf(op);
            while (ix >= 0) {
               basic.splice(ix - 1, 3, eval(basic.slice(ix - 1, ix + 2).join('')));
               ix = basic.indexOf(op);
            }
         };
         processOp('+');
         processOp('*');
      }

      return +basic[0];
   }
}

class Solution18 implements ISolution {
   dayNumber: number = 18

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let result = 0;
      for (let line of inputFile.readLines()) {
         let s = new ExpressionSolver(line);
         result += s.calcExpr(1);
      }
      return "" + result;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let result = 0;
      for (let line of inputFile.readLines()) {
         let s = new ExpressionSolver(line);
         result += s.calcExpr(2);
      }
      return "" + result;
   }
}

export default new Solution18 as ISolution;
