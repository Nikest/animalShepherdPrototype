export class Vector2 {
    constructor(public x: number, public y: number) {}

    lerp(target: Vector2, t: number): void {
        this.x += (target.x - this.x) * t;
        this.y += (target.y - this.y) * t;
    }

    public distanceTo(target: Vector2): number {
        return Math.sqrt((target.x - this.x) ** 2 + (target.y - this.y) ** 2);
    }

    followTarget(target: Vector2, stopDistance: number): Vector2 {
        const directionX = target.x - this.x;
        const directionY = target.y - this.y;

        const distance = Math.sqrt(directionX ** 2 + directionY ** 2);

        const normDirectionX = directionX / distance;
        const normDirectionY = directionY / distance;

        const approachX = target.x - normDirectionX * stopDistance;
        const approachY = target.y - normDirectionY * stopDistance;

        return new Vector2(approachX, approachY);
    }
}