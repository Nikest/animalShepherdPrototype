import './index.less';

import { ViewEngine } from '@Modules/ViewEngine';
import { Game } from '@Modules/Game';
import { Interface } from '@Modules/Interface';


const viewElem = document.getElementById('view') as HTMLDivElement;
const scoreInfoElem = document.getElementById('score-info') as HTMLElement;

const viewEngine = new ViewEngine(viewElem, scoreInfoElem);
const game = new Game();
const gameInterface = new Interface();

document.addEventListener('DOMContentLoaded', () => setTimeout(launch, 1000));

function launch() {
    game.start();
    viewEngine.rendering();
    gameInterface.watch();

    document.body.classList.add('visible');
}