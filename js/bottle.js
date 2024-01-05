import Tile from './tile.js'

export default class Bottle {
    /**
     * @type {Tile[]}
     */
    #tiles = [];

    constructor(bottleId = null, palette = null, counter = null) {
        let bottle = document.createElement('div');
        bottle.classList.add('bottle');

        document.getElementById('area').appendChild(bottle);

        if (bottleId !== null) {
            for (let i = 1; i <= 4; i++) {
                let tileId = 4 * bottleId + i;

                this.#tiles.push(new Tile(tileId, bottle, palette, counter));
            }
        }
    }

    stopListen = () => {
        this.#tiles.forEach((tile) => {
            tile.stopListen();
        });

        this.#tiles = [];
    }
}
