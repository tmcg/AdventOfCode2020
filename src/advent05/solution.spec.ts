
import solution from './solution';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('904');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('669');
  });
});
