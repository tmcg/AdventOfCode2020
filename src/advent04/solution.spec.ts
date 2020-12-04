
import solution, { PassportScanner } from './solution';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  const s0 = ["ecl:gry"];
  const s1 = ["ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"];

  it('is invalid passport', () => {
    let s = new PassportScanner(s0);
    expect(s.isPassportValidPart1(s.passports[0])).to.equal(false);
  })

  it('is valid passport', () => {
    let s = new PassportScanner(s1);
    expect(s.isPassportValidPart1(s.passports[0])).to.equal(true);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('204');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('179');
  });
});
