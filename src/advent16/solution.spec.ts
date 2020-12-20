
import solution, { TicketScanner } from './solution';
import { InputFile } from '../shared';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should parse the input', () => {
    const inputFile = new InputFile(solution.dayNumber, 'input.txt');

    let s = new TicketScanner(inputFile.readLines());

    expect(s.yourTicket.nums).eql([89,137,223,97,61,167,181,53,179,139,211,127,229,227,173,101,83,131,59,79]);
    expect(s.nearTickets.length).to.equal(240);
    expect(s.nearTickets[0].nums).eql([170,218,811,107,747,184,411,426,594,629,764,509,287,385,734,853,646,474,937,773]);
    expect(s.nearTickets[1].nums).eql([683,727,850,596,125,222,334,774,778,567,427,90,478,385,174,497,184,745,646,88]);
    expect(s.nearTickets[239].nums).eql([577,171,878,134,600,368,171,169,450,229,761,843,82,575,870,886,64,455,414,564]);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('19093');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('5311123569883');
  });
});
