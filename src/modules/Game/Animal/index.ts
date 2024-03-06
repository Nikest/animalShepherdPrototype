import { Procedural } from '@Modules/Procedural';
import { Game } from '@Modules/Game';
import { Vector2 } from '@GameModules/Vector';
import { Actor } from '@GameModules/Actor';

export class Animal extends Actor {
    public id: string;

    private maxDistance = 500;
    private maxDistanceYard = 50;

    public isFollowing: boolean = false;
    public isInYard: boolean = false;
    constructor(seed: number, private maxSpawnWidth: number, private maxSpawnHeight: number) {
        super();
        this.seed = seed;
        this.procedural = new Procedural(this.seed);
        this.id = `Animal_id_${this.procedural.randomInt(0, 100000)}`;
        this.size = 50;
        this.semiSize = this.size / 2;

        this.movementSpeed = 0.01;

        let posX, posY;
        const proceduralSide = this.procedural.randomFromArray(['left', 'top', 'right']);

        if (proceduralSide === 'left') {
            posX = this.procedural.randomInt(this.size, this.size * 2);
            posY = this.procedural.randomInt(this.size, this.maxSpawnHeight - this.size);
            this.position = new Vector2(posX - this.size * 2, posY);

        } else if (proceduralSide === 'top') {
            posX = this.procedural.randomInt(this.size, this.maxSpawnWidth - this.size);
            posY = this.procedural.randomInt(this.size, this.size * 2);
            this.position = new Vector2(posX, posY - this.size * 2);

        } else {
            posX = this.procedural.randomInt(this.maxSpawnWidth, this.maxSpawnWidth - this.size * 2);
            posY = this.procedural.randomInt(this.size, this.maxSpawnHeight - this.size);
            this.position = new Vector2(this.maxSpawnWidth + (this.size * 2), posY);
        }

        this.previousPosition = new Vector2(this.position.x, this.position.y);
        this.targetPosition = new Vector2(posX, posY);

        this.endMovingTime = new Date();

        requestAnimationFrame(this.update.bind(this));
    }

    calculateTargetPositionInField() {
        this.previousPosition = new Vector2(this.position.x, this.position.y);

        if (this.isFollowing) {
            this.followsMainHero();
            this.endMovingTime = new Date(new Date().getTime() + 400);
            return;
        }

        const vectorLimit = 0;

        const xFrom = Math.max(this.position.x - this.maxDistance, vectorLimit);
        const xTo = Math.min(this.position.x + this.maxDistance, this.maxSpawnWidth - this.size);
        const proceduralX = this.procedural.randomInt(xFrom, xTo);

        const yFrom = Math.max(this.position.y - this.maxDistance, vectorLimit);
        const yTo = Math.min(this.position.y + this.maxDistance, this.maxSpawnHeight - this.size);
        const proceduralY = this.procedural.randomInt(yFrom, yTo);

        this.targetPosition = new Vector2(proceduralX, proceduralY);

        this.endMovingTime = new Date(new Date().getTime() + this.procedural.randomInt(2000, 2500));
    }

    calculateTargetPositionInYard() {
        this.previousPosition = new Vector2(this.position.x, this.position.y);

        if (this.isFollowing) {
            this.followsMainHero();
            this.endMovingTime = new Date(new Date().getTime() + 400);
            return;
        }

        const vectorXLimit = 0;
        const vectorYLimitTop = this.maxSpawnHeight + this.size;
        const vectorYLimitBottom = this.maxSpawnHeight + Game.instance.yardHeight;

        const xFrom = Math.max(this.position.x - this.maxDistanceYard, vectorXLimit);
        const xTo = Math.min(this.position.x + this.maxDistanceYard, this.maxSpawnWidth - this.size);
        const proceduralX = this.procedural.randomInt(xFrom, xTo);

        const yFrom = Math.max(this.position.y - this.maxDistanceYard, vectorYLimitTop);
        const yTo = Math.min(this.position.y + this.maxDistanceYard, vectorYLimitBottom - this.size);
        const proceduralY = this.procedural.randomInt(yFrom, yTo);

        this.targetPosition = new Vector2(proceduralX, proceduralY);

        this.endMovingTime = new Date(new Date().getTime() + this.procedural.randomInt(2000, 2500));
    }

    calculateTargetPositionFollow() {
        this.previousPosition = new Vector2(this.position.x, this.position.y);
        this.followsMainHero();
        this.endMovingTime = new Date(new Date().getTime() + 400);
    }

    move() {
        this.position.lerp(this.targetPosition, this.movementSpeed);
    }

    update() {
        if (this.isFollowing) {
            this.followsMainHero();
            return;
        }

        if (new Date() > this.endMovingTime) {
             this.isInYard ? this.calculateTargetPositionInYard() : this.calculateTargetPositionInField();
        }

        this.move();

        requestAnimationFrame(() => this.update());
    }

    follow() {
        this.isFollowing = true;
        this.movementSpeed = 0.05;
    }

    inYard() {
        this.isFollowing = false;
        this.isInYard = true;
        this.movementSpeed = 0.01;
    }
    followsMainHero() {
        if (!this.isFollowing) {
            requestAnimationFrame(() => this.update());
            return;
        }
        const mainHeroPosition = Game.instance.getMainHero().position;
        const mainHeroSize = Game.instance.getMainHero().size;

        this.targetPosition = this.position.followTarget(mainHeroPosition, mainHeroSize + this.size);
        const distance = this.position.distanceTo(this.targetPosition);
        this.endMovingTime = new Date(new Date().getTime() + distance / this.movementSpeed);

        this.move();

        if (this.isFollowing && this.position.y > this.maxSpawnHeight) {
            Game.instance.setToYard(this.id);
            this.isFollowing = false;
        }

        requestAnimationFrame(() => this.followsMainHero());
    }
}
