
import solution, { ExpressionSolver } from './solution';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should calc expr with part 1 rules', () => {
    expect(new ExpressionSolver('1 + (2 * 3) + (4 * (5 + 6))').calcExpr(1)).to.equal(51);
    expect(new ExpressionSolver('2 * 3 + (4 * 5)').calcExpr(1)).to.equal(26);
    expect(new ExpressionSolver('5 + (8 * 3 + 9 + 3 * 4 * 3)').calcExpr(1)).to.equal(437);
    expect(new ExpressionSolver('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))').calcExpr(1)).to.equal(12240);
    expect(new ExpressionSolver('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2').calcExpr(1)).to.equal(13632);
  })

  it('should calc expr with part 2 rules', () => {
    expect(new ExpressionSolver('1 + (2 * 3) + (4 * (5 + 6))').calcExpr(2)).to.equal(51);
    expect(new ExpressionSolver('2 * 3 + (4 * 5)').calcExpr(2)).to.equal(46);
    expect(new ExpressionSolver('5 + (8 * 3 + 9 + 3 * 4 * 3)').calcExpr(2)).to.equal(1445);
    expect(new ExpressionSolver('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))').calcExpr(2)).to.equal(669060);
    expect(new ExpressionSolver('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2').calcExpr(2)).to.equal(23340);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('67800526776934');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('340789638435483');
  });
});
