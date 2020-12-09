
import solution, { ConsoleComputer } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should detect infinite loop', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let c1 = new ConsoleComputer(inputFile.readLines());
    expect(c1.execute()).to.equal(false);
    expect(c1.accumulator).to.equal(5);
  });

  it('should detect termination', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let c1 = new ConsoleComputer(inputFile.readLines());
    c1.flipJmpNop(7);

    expect(c1.execute()).to.equal(true);
    expect(c1.accumulator).to.equal(8);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('1553');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('1877');
  });
});
