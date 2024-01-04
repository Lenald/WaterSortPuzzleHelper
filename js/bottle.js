import Tile from './tile.js'

export default class Bottle {
   constructor(bottleId = null, palette = null, counter = null) {
        let bottle = document.createElement('div');
        bottle.classList.add('bottle');

        document.getElementById('area').appendChild(bottle)

        if (bottleId !== null) {
            for (let i = 1; i <= 4; i++) {
                let tileId = 4 * bottleId + i;

                new Tile(tileId, bottle, palette, counter);
            }
        }
    }
}