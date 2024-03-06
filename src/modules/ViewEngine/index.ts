import * as PIXI from 'pixi.js';
import { Animal } from '@GameModules/Animal';
import { Game } from '@Modules/Game';
import { Interface } from '@Modules/Interface';

export class ViewEngine {
    static instance: ViewEngine;

    public viewElem: HTMLDivElement;
    public viewApp: PIXI.Application<HTMLCanvasElement>;
    public scoreInfoElem: HTMLElement;
    public width: number;
    public height: number;

    public resolution: number = 2;

    public fieldColor: string = '#52944c';
    public yardColor: string = '#c4b566';
    public animalColor: string = '#ffffff';
    public animalFollowingColor: string = '#caffc8';
    public animalInYardColor: string = '#ffe9e9';
    public mainHeroColor: string = '#720000';
    constructor(viewElem: HTMLDivElement, scoreInfoElem: HTMLElement) {
        this.viewElem = viewElem;
        this.scoreInfoElem = scoreInfoElem;

        this.width = this.viewElem.clientWidth * this.resolution;
        this.height = this.viewElem.clientHeight * this.resolution;

        this.viewApp = new PIXI.Application<HTMLCanvasElement>({
            width: this.width,
            height: this.height,
            backgroundColor: this.fieldColor,
        });

        this.viewElem.appendChild(this.viewApp.view);

        this.viewApp.view.addEventListener('mousedown', (e) => {
            this.interactive(e);
        });

        ViewEngine.instance = this;
   }

   interactive(e: MouseEvent) {
       const x = e.clientX * this.resolution;
       const y = e.clientY * this.resolution;
       Interface.instance.moveTo(x, y);
    }

   rendering() {
        this.update();
        requestAnimationFrame(() => this.rendering());
   }

   update() {
       this.viewApp.stage.removeChildren();

       this.drawYard();
       this.drawMainHero();

       Game.instance.getAnimals().forEach(animal => {
           this.drawAnimal(animal.semiSize, animal.position.x, animal.position.y, animal.isFollowing);
       });

       Game.instance.getAnimalsInYard().forEach(animal => {
           this.drawAnimalInYard(animal.semiSize, animal.position.x, animal.position.y);
       });
   }

   drawYard() {
         const graphics = new PIXI.Graphics();
         graphics.beginFill(this.yardColor);
         graphics.drawRect(0, this.height - Game.instance.yardHeight, this.width, Game.instance.yardHeight);
         graphics.endFill();
         this.viewApp.stage.addChild(graphics);
   }

    drawAnimal(size: number, x: number, y: number, isFollowing: boolean = false) {
        const graphics = new PIXI.Graphics();

        graphics.beginFill(isFollowing ? this.animalFollowingColor : this.animalColor);
        graphics.drawCircle(x, y, size);
        graphics.endFill();
        this.viewApp.stage.addChild(graphics);
    }

    drawAnimalInYard(size: number, x: number, y: number) {
        const graphics = new PIXI.Graphics();

        graphics.beginFill(this.animalInYardColor);
        graphics.drawCircle(x, y, size);
        graphics.endFill();
        this.viewApp.stage.addChild(graphics);
    }

   drawMainHero() {
       const mainHero = Game.instance.getMainHero();
       const x = mainHero.position.x;
       const y = mainHero.position.y;

       const graphics = new PIXI.Graphics();
       graphics.beginFill(this.mainHeroColor);
       graphics.drawCircle(x, y, mainHero.size);
       graphics.endFill();
       this.viewApp.stage.addChild(graphics);

       this.scoreInfoElem.innerHTML = `${mainHero.score}`;
   }
}