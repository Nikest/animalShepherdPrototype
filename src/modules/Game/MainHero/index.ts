import { Game } from '@Modules/Game';
import { Vector2 } from '@GameModules/Vector';
import { Actor } from '@GameModules/Actor';

export class MainHero extends Actor {
    name: string;

    public animalFollowsIds = new Set<string>();
    private maxAnimalFollows = 5;

    public score: number = 0;
    constructor(fieldWidth: number, fieldHeight: number) {
        super();
        this.name = 'MainHero';
        this.size = 75;

        const spawnX = fieldWidth / 2;
        const spawnY = fieldHeight / 2;

        this.previousPosition = new Vector2(spawnX, spawnY);
        this.position = new Vector2(spawnX, spawnY);
        this.targetPosition = new Vector2(spawnX, spawnY);

        this.endMovingTime = new Date();

        this.movementSpeed = 0.05;
    }

    init() {
        requestAnimationFrame(() => this.update());
    }

    setScore(score: number) {
        this.score = score;
    }

    animalsForCapture() {
        if (this.animalFollowsIds.size === this.maxAnimalFollows) return;

        const animalsNear = Game.instance.getAnimalsNearMainHero();

        for (let i = 0; i < animalsNear.length; i++) {
            animalsNear[i].follow();
            this.animalFollowsIds.add(animalsNear[i].id);

            if (this.animalFollowsIds.size === this.maxAnimalFollows) {
                break;
            }
        }
    }

    update() {
        this.position.lerp(this.targetPosition, this.movementSpeed);

        this.animalsForCapture();

        requestAnimationFrame(() => this.update());
    }

    setTargetPosition(x: number, y: number) {
        this.targetPosition = new Vector2(x, y);

        const distance = this.position.distanceTo(this.targetPosition);
        this.endMovingTime = new Date(new Date().getTime() + distance / this.movementSpeed);
    }
}