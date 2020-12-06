
import solution, { DeclarationCalculator } from './solution';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should find unique questions', () => {
    let c = new DeclarationCalculator([]);

    expect(c.uniqueQuestions('')).to.equal(0);
    expect(c.uniqueQuestions('s|s')).to.equal(1);
    expect(c.uniqueQuestions('m|ftz')).to.equal(4);
    expect(c.uniqueQuestions('h|h|h|h|h')).to.equal(1);
  });

  it('should find universal questions', () => {
    let c = new DeclarationCalculator([]);

    expect(c.universalQuestions('')).to.equal(0);
    expect(c.universalQuestions('s|s')).to.equal(1);
    expect(c.universalQuestions('m|ftz')).to.equal(0);
    expect(c.universalQuestions('h|h|h|h|h')).to.equal(1);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('6551');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('3358');
  });
});
