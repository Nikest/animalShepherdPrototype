import { Procedural } from '@Modules/Procedural';
import { Vector2 } from 'src/modules/Game/Vector';

export class Actor {
    public seed: number;
    public procedural: Procedural;

    public size: number;
    public semiSize: number;

    public previousPosition: Vector2;
    public position: Vector2;
    public targetPosition: Vector2;

    public endMovingTime: Date;

    public movementSpeed: number = 0.05;
    constructor() {
        this.size = 50;
    }
}