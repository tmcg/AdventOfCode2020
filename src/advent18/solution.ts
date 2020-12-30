
import { textSpanIntersectsWithPosition } from 'typescript';
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

      while(true) {
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

   calcExpr(): number {
      return this.calc(this.expr);
   }

   calc(expr: TokenOrSub[]): number {

      let basic = expr.map(e => {
         if (typeof(e) !== 'string' && typeof(e) !== 'number') {
            return this.calc(<TokenOrSub[]>e);
         }
         return <Token>e;
      });

      let acc = 0;
      let op = '+';
      for (let elem of basic) {
         if (typeof(elem) === 'number') {
            acc = eval(acc + op + elem);
         } else {
            op = elem;
         }
      }

      return acc;
   }
}

class Solution18 implements ISolution {
   dayNumber: number = 18

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let result = 0;
      for (let line of inputFile.readLines()) {
         let s = new ExpressionSolver(line);
         result += s.calcExpr();
      }
      return ""+result;
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      return "";
   }
}

export default new Solution18 as ISolution;
