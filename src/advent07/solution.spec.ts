
import solution, { LuggageProcessor } from './solution';
import { expect } from 'chai';

describe(`Advent of Code Day ${solution.dayNumber}`, () => {

  it('should parse rules', () => {
    let p = [
      LuggageProcessor.parseRule('wavy teal bags contain no other bags.'),
      LuggageProcessor.parseRule('bright purple bags contain 5 muted chartreuse bags, 1 dotted yellow bag.'),
      LuggageProcessor.parseRule('drab red bags contain 1 mirrored magenta bag.'),
      LuggageProcessor.parseRule('clear coral bags contain 4 drab black bags, 3 dark black bags.'),
    ];

    expect(p[0]).eql(['wavy teal', {}]);
    expect(p[1]).eql(['bright purple', { 'muted chartreuse': 5, 'dotted yellow': 1 }]);
    expect(p[2]).eql(['drab red', { 'mirrored magenta': 1 }]);
    expect(p[3]).eql(['clear coral', { 'drab black': 4, 'dark black': 3 }]);
  })

  it('should find total bag count', () => {

    let input = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`.trim().split('\n');

    let p = new LuggageProcessor(input);

    expect(p.findBagsTotalCount('faded blue')).to.equal(0);
    expect(p.findBagsTotalCount('dotted black')).to.equal(0);
    expect(p.findBagsTotalCount('vibrant plum')).to.equal(11);
    expect(p.findBagsTotalCount('dark olive')).to.equal(7);
    expect(p.findBagsTotalCount('shiny gold')).to.equal(32);
  });

  it('should solve part 1', () => {
    expect(solution.solvePart1()).to.equal('197');
  });

  it('should solve part 2', () => {
    expect(solution.solvePart2()).to.equal('85324');
  });
});
