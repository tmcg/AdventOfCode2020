
import solution, { Ferry, FerryInstruction } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should process part 1 rules', () => {
    let f = new Ferry(['F10', 'N3', 'F7', 'R90', 'F11']);
    let result = f.processAll(1);

    expect(result).to.equal(25);
  });

  it('should process part 2 rules', () => {
    let f = new Ferry(['F10', 'N3', 'F7', 'R90', 'F11']);
    let result = f.processAll(2);

    expect(result).to.equal(286);
  })

  it('should process part 2 rule N/S/E/W', () => {
    let f = new Ferry([]);

    expect(f.position).eql({ x: 0, y: 0 });
    expect(f.waypoint).eql({ x: 10, y: 1 });

    f.processPart2(new FerryInstruction("N10"));
    expect(f.position).eql({ x: 0, y: 0 });
    expect(f.waypoint).eql({ x: 10, y: 11 });

    f.processPart2(new FerryInstruction("S3"));
    expect(f.position).eql({ x: 0, y: 0 });
    expect(f.waypoint).eql({ x: 10, y: 8 });

    f.processPart2(new FerryInstruction("E5"));
    expect(f.position).eql({ x: 0, y: 0 });
    expect(f.waypoint).eql({ x: 15, y: 8 });

    f.processPart2(new FerryInstruction("W20"));
    expect(f.position).eql({ x: 0, y: 0 });
    expect(f.waypoint).eql({ x: -5, y: 8 });
  });

  it('should process part 2 rule F', () => {
    let f = new Ferry([]);

    f.processPart2(new FerryInstruction("F2"));
    expect(f.position).eql({ x: 20, y: 2 });
    expect(f.waypoint).eql({ x: 10, y: 1 });

    f.waypoint = { x: -5, y: 6 }
    f.processPart2(new FerryInstruction("F3"))
    expect(f.position).eql({ x: 5, y: 20 });
  });

  it('should process part2 rule L', () => {
    let f = new Ferry([]);
    expect(f.waypoint).eql({ x: 10, y: 1 });

    f.processPart2(new FerryInstruction("L90"));
    expect(f.waypoint).eql({ x: -1, y: 10 });
    f.processPart2(new FerryInstruction("L90"));
    expect(f.waypoint).eql({ x: -10, y: -1 });
    f.processPart2(new FerryInstruction("L90"));
    expect(f.waypoint).eql({ x: 1, y: -10 });
    f.processPart2(new FerryInstruction("L90"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
    f.processPart2(new FerryInstruction("L180"));
    expect(f.waypoint).eql({ x: -10, y: -1 });
    f.processPart2(new FerryInstruction("L180"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
    f.processPart2(new FerryInstruction("L270"));
    f.processPart2(new FerryInstruction("L270"));
    f.processPart2(new FerryInstruction("L270"));
    f.processPart2(new FerryInstruction("L270"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
  });

  it('should process part2 rule R', () => {
    let f = new Ferry([]);
    expect(f.waypoint).eql({ x: 10, y: 1 });

    f.processPart2(new FerryInstruction("R90"));
    expect(f.waypoint).eql({ x: 1, y: -10 });
    f.processPart2(new FerryInstruction("R90"));
    expect(f.waypoint).eql({ x: -10, y: -1 });
    f.processPart2(new FerryInstruction("R90"));
    expect(f.waypoint).eql({ x: -1, y: 10 });
    f.processPart2(new FerryInstruction("R90"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
    f.processPart2(new FerryInstruction("R180"));
    expect(f.waypoint).eql({ x: -10, y: -1 });
    f.processPart2(new FerryInstruction("R180"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
    f.processPart2(new FerryInstruction("R270"));
    f.processPart2(new FerryInstruction("R270"));
    f.processPart2(new FerryInstruction("R270"));
    f.processPart2(new FerryInstruction("R270"));
    expect(f.waypoint).eql({ x: 10, y: 1 });
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('636');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('26841');
  });
});
