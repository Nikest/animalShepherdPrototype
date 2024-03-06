import { Animal } from '@GameModules/Animal';
import { Procedural } from '@Modules/Procedural';
import { MainHero } from '@GameModules/MainHero';
import { ViewEngine } from '@Modules/ViewEngine';
export class Game {
    static instance: Game;

    readonly seed: number = 14545723;
    private procedural: Procedural;

    public animals: Animal[] = [];
    public animalsInYard: Animal[] = [];

    public mainHero: MainHero;

    private startAnimals = 5;

    readonly fieldWidth: number = 0;
    readonly fieldHeight: number = 0;

    readonly yardHeight: number = 200;
    constructor() {
        this.procedural = new Procedural(this.seed);

        this.fieldWidth = ViewEngine.instance.width;
        this.fieldHeight = ViewEngine.instance.height;

        Game.instance = this;
    }
    start() {
        this.mainHero = new MainHero(this.fieldWidth, this.fieldHeight);
        this.mainHero.init();
        for (let i = 0; i < this.startAnimals; i++) {
            this.animals.push(new Animal(this.procedural.randomInt(0, 10000), this.fieldWidth, this.fieldHeight - this.yardHeight));
        }

        setTimeout(() => {
            this.createAnimal();
        }, this.procedural.randomInt(6000, 12000));
    }

    getMainHero() {
        return this.mainHero;
    }
    getAnimals() {
        return this.animals;
    }

    getAnimalsInYard() {
        return this.animalsInYard;
    }

    getAnimalsNearMainHero() {
        return this.animals.filter(animal => {
            const distance = this.mainHero.position.distanceTo(animal.position);
            return distance < this.mainHero.size + animal.size;
        });
    }

    createAnimal() {
        this.animals.push(new Animal(this.procedural.randomInt(0, 10000), this.fieldWidth, this.fieldHeight - this.yardHeight));

        setTimeout(() => {
            this.createAnimal();
        }, this.procedural.randomInt(1000, 6000));
    }

    setToYard(animalId: string) {
        const animal = this.animals.find(animal => animal.id === animalId);
        const animalIndex = this.animals.findIndex(animal => animal.id === animalId);
        if (!animal) return;

        animal.inYard();
        this.animalsInYard.push(animal);
        this.animals = this.animals.filter((_, index) => index !== animalIndex);

        this.mainHero.setScore(this.mainHero.score + 100);
        this.mainHero.animalFollowsIds.delete(animalId);
    }
}