
import solution, { PocketDimension } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should parse the input', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let pd = new PocketDimension(inputFile.readLines());

    expect(pd.cmap.size).to.equal(5);
    expect(pd.cmap.has('1,0,0')).is.true;
    expect(pd.cmap.has('2,1,0')).is.true;
    expect(pd.cmap.has('0,2,0')).is.true;
    expect(pd.cmap.has('1,2,0')).is.true;
    expect(pd.cmap.has('2,2,0')).is.true;
  });

  it('should calculate neighbours', () => {
    let pd = new PocketDimension([]);

    let n0 = pd.neighbours({x: 2, y: 2, z: 2 });
    expect(n0.length).to.equal(26);
  });

  it('should calculate the next cycle', () => {
    const inputFile = new InputFile(solution.dayNumber, 'sample1.txt');

    let pd = new PocketDimension(inputFile.readLines());

    pd.nextCycle();
    expect(pd.cmap.size).to.equal(11);

    pd.nextCycle();
    expect(pd.cmap.size).to.equal(21);

    pd.nextCycle();
    expect(pd.cmap.size).to.equal(38);

    pd.nextCycle();
    pd.nextCycle();
    pd.nextCycle();
    expect(pd.cmap.size).to.equal(112);
  })

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('391');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('zz');
  });
});
