
import solution, { MemoryGame } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should find the next number', () => {

    let g = new MemoryGame([0, 3, 6], 7);
    expect(g.input).eql([0, 3, 6]);

    expect(g.lastNumber).to.equal(6);
    expect(g.lastIndex).to.equal(3);
    expect(g.memory).eql([[1], , , [2], , , [3]]);

    g.nextNumber();
    expect(g.lastNumber).to.equal(0);
    expect(g.lastIndex).to.equal(4);
    expect(g.memory).eql([[1, 4], , , [2], , , [3]]);

    g.nextNumber();
    expect(g.lastNumber).to.equal(3);
    expect(g.lastIndex).to.equal(5);
    expect(g.memory).eql([[1, 4], , , [2, 5], , , [3]]);

    g.nextNumber();
    expect(g.lastNumber).to.equal(3);
    expect(g.lastIndex).to.equal(6);
    expect(g.memory).eql([[1, 4], , , [5, 6], , , [3]]);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('1025');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('129262');
  });
});
