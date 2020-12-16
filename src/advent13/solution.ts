
import { ISolution, InputFile, Util } from '../shared';

export interface BusTime {
   id: number;
   freq: number;
}

export class BusSchedule {
   timestamp: number;
   busTimes: BusTime[];

   constructor(input: string[]) {
      this.timestamp = +input[0];

      this.busTimes = input[1].split(',')
         .map((b, i) => <BusTime>{ id: b === 'x' ? 0 : +b, freq: i })
         .filter(b => b.id > 0);

      //console.log(this.busTimes);
   }

   smallestWait(): number {
      let buses = this.busTimes.map(b => b.id);
      let waitTimes = buses.map(b => b - (this.timestamp % b))
      let smallestWait = Math.min(...waitTimes);

      return buses[waitTimes.indexOf(smallestWait)] * smallestWait;
   }

   inverseMod(a: bigint, m: bigint): bigint {
      if (this.gcd(a, m) != 1n)
         throw new Error('No modular inverse!');

      // Euler's theorem to find x such that a*x is congruent to 1 (mod m)
      return this.power(a, m - 2n, m);
   }

   gcd(a: bigint, b: bigint): bigint {
      if (a === 0n) return b;
      return this.gcd(b % a, a);
   }

   power(x: bigint, y: bigint, m: bigint): bigint {
      if (y === 0n)
         return 1n;

      let p = this.power(x, y / 2n, m) % m;
      p = (p * p) % m;

      if (y % 2n === 0n)
         return p;

      return (x * p) % m;
   }

   findTimestamp(): bigint {
      let bt = this.busTimes.map(b => { return { id: BigInt(b.id), freq: BigInt(b.freq) } });

      // Chinese remainder theorem
      // https://www.youtube.com/watch?v=0dbXaSkZ-vc
      let M = bt.reduce((a, c) => a * c.id, 1n);
      let Mi = bt.map(t => M / t.id);
      let a = bt.map((t, i) => i > 0 ? t.id - t.freq : 0n);
      let y = bt.map((t, i) => this.inverseMod(Mi[i], t.id));
      let x = Mi.map((m, i) => a[i] * y[i] * m).reduce((a, c) => a + c);

      // Find the smallest T that satisfies all congruences:
      //bt.forEach((t, n) => console.log(`${a[n]} \u2261 T (mod ${t.id})`));
      return (x - (x / M) * M);
   }
}

class Solution13 implements ISolution {
   dayNumber: number = 13;

   solvePart1(): string {
      const inputFile = new InputFile(this.dayNumber);

      let s = new BusSchedule(inputFile.readLines());
      return "" + s.smallestWait();
   }

   solvePart2(): string {
      const inputFile = new InputFile(this.dayNumber);

      let s = new BusSchedule(inputFile.readLines());
      return "" + s.findTimestamp();
   }
}

export default new Solution13() as ISolution;
