
import solution, { XmasEncoder } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should detect encoding error', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let e1 = new XmasEncoder(inputFile.readLines(), 5);

    expect(e1.input.length).to.equal(20);
    expect(e1.findEncodingError()).to.equal(127);
  });

  it('should find encryption weakness', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let e1 = new XmasEncoder(inputFile.readLines(), 5);

    expect(e1.input.length).to.equal(20);
    expect(e1.findEncryptionWeakness()).to.equal(62);

  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('1124361034');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('129444555');
  });
});
