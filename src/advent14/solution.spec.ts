
import solution, { DockingComputer } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should parse input', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let c = new DockingComputer(inputFile.readLines());

    expect(c.program.map(i => i.code)).eql(['mask', 'mem', 'mem', 'mem']);
    expect(c.program.map(i => i.mask)).eql(['XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X','','','']);
    expect(c.program.map(i => ""+i.val1)).eql(['0', '8', '7', '8']);
    expect(c.program.map(i => ""+i.val2)).eql(['0', '11', '101', '0']);
  });

  it('should produce mask combinations part 2', () => {
    let c = new DockingComputer([]);

    expect(c.findAllMasks('000000000000000000000000000000X1001X')).eql([
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX01XX10',
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX01XX11',
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX11XX10',
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX11XX11',
    ]);
  });

  it('should run the sample part 1', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let c = new DockingComputer(inputFile.readLines());
    while(c.step(1));
    expect(''+c.sumMemory()).to.equal('165');
  });

  it ('should run the sample part 2', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample2.txt');

    let c = new DockingComputer(inputFile.readLines());
    while(c.step(2));
    expect(''+c.sumMemory()).to.equal('208');
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('11327140210986');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('2308180581795');
  });
});
