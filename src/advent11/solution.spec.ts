
import solution, { SeatingArea } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should read input', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let a = new SeatingArea(inputFile.readLines());
    expect(a.getSeat(0, 0)).to.equal('L');
    expect(a.getSeat(0, 1)).to.equal('L');
    expect(a.getSeat(1, 0)).to.equal('.');
    expect(a.getSeat(1, 1)).to.equal('L');
    expect(a.getSeat(99,99)).to.equal(' ');
  });

  it('should calculate next state', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let a = new SeatingArea(inputFile.readLines());
    a.nextRound(1);
    expect(a.getSeat(0, 0)).to.equal('#');
    expect(a.getSeat(0, 1)).to.equal('#');
    expect(a.getSeat(1, 0)).to.equal('.');
    expect(a.getSeat(1, 1)).to.equal('#');
    expect(a.getSeat(99,99)).to.equal(' ');
    a.nextRound(1);
    expect(a.getSeat(0, 0)).to.equal('#');
    expect(a.getSeat(0, 1)).to.equal('#');
    expect(a.getSeat(1, 0)).to.equal('.');
    expect(a.getSeat(1, 1)).to.equal('L');
    expect(a.getSeat(99,99)).to.equal(' ');
  });

  it('should find occupied seats part 1', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let a = new SeatingArea(inputFile.readLines());
    while(a.nextRound(1) > 0);

    expect(a.occupiedSeats()).to.equal(37);
  });

  it('should find occupied seats part 2', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let a = new SeatingArea(inputFile.readLines());
    while(a.nextRound(2) > 0);

    expect(a.occupiedSeats()).to.equal(26);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('2126');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('1914');
  });
});
