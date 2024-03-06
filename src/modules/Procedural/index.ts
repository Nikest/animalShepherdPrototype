import * as seedrandom from 'seedrandom';

export class Procedural {
    readonly rng: any;
    constructor(seed: number) {
        this.rng = seedrandom(seed.toString());
    }
    random() {
        return this.rng();
    }
    randomInt(min: number, max: number) {
        return Math.floor(this.rng() * (max - min + 1)) + min;
    }
    randomFloat(min: number, max: number) {
        return this.rng() * (max - min) + min;
    }
    randomBool() {
        return this.rng() > 0.5;
    }

    randomFromArray<T>(array: T[]): T {
        return array[this.randomInt(0, array.length - 1)];
    }
}