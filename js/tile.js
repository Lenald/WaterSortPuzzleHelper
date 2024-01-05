export default class Tile {
    #id = 0;
    #tileElement;

    /**
     * @type {Counter}
     */
    #counter = null;

    constructor(id, bottle, palette, counter) {
        this.#id = id;
        this.#counter = counter;

        let tile = document.createElement('div');
        tile.classList.add('tile', 'undefined');
        tile.id = id;

        bottle.appendChild(tile);

        this.observe(tile, palette);
    }

    /**
     * @param tile
     * @param {Palette} palette
     */
    observe = (tile, palette) => {
        this.#tileElement = tile;

        this.#tileElement.addEventListener('click', (e) => {
            let elem = e.target.getBoundingClientRect(),
                x = elem.left + elem.width / 2,
                y = elem.top + elem.height / 2;

            palette.show(x, y, this.#id);

            e.stopImmediatePropagation();
        });

        document.addEventListener('color-chosen', this.#setColor);
    }

    stopListen = () => {
        document.removeEventListener('color-chosen', this.#setColor)
    }

    #setColor = (e) => {
        if (e.detail.targetId === this.#id) {
            let classList = this.#tileElement.classList,
                currentColor = classList.item(classList.length - 1);

            try {
                this.#counter.vacate(currentColor);
                this.#counter.occupy(e.detail.color);

                this.#tileElement.classList.remove(currentColor);
                this.#tileElement.classList.add(e.detail.color);
            } catch (e) {
                console.error(e.message);
            }
        }
    }
}
