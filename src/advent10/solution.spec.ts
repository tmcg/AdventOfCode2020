
import solution, { AdapterArray } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should sort the numbers', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');
    let a = new AdapterArray(inputFile.readLines());

    expect(a.joltages).eql([0, 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, 22]);
  });

  it('should find path', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');
    let a = new AdapterArray(inputFile.readLines());

    expect(a.findJoltagePath()).eql([0, 1, 3, 1, 1, 1, 3, 1, 1, 3, 1, 3, 3]);
  });

  it('should find all paths (1)', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');
    let a = new AdapterArray(inputFile.readLines());
    expect(a.findAllJoltagePaths()).to.equal(8);
  })

  it('should find all paths (2)', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample2.txt');
    let a = new AdapterArray(inputFile.readLines());
    expect(a.findAllJoltagePaths()).to.equal(19208);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('2470');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('1973822685184');
  });
});
