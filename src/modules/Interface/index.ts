import { Game } from '@Modules/Game';
import { ViewEngine } from '@Modules/ViewEngine';

export class Interface {
    static instance: Interface = new Interface();

    private mouseDown = false;
    constructor() {
        Interface.instance = this;
    }

    watch() {
        ViewEngine.instance.viewApp.view.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
        });

        ViewEngine.instance.viewApp.view.addEventListener('mouseup', (e) => {
            this.mouseDown = false;
        });

        ViewEngine.instance.viewApp.view.addEventListener('mousemove', (e) => {
            this.mouseDown && this.moveTo(e.clientX * ViewEngine.instance.resolution, e.clientY * ViewEngine.instance.resolution);
        });
    }

    moveTo(x: number, y: number) {
        Game.instance.getMainHero().setTargetPosition(x, y);
    }
}