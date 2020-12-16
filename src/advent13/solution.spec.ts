
import solution, { BusSchedule } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should find earliest bus', () => {
    let s = new BusSchedule(['939','7,13,x,x,59,x,31,19']);

    expect(s.smallestWait()).to.equal(295);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('4315');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('zz');
  });
});
