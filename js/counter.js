export default class Counter {
    /**
     * @type {Palette}
     */
    #palette;
    #limit = 4;
    #colors = {
        red: 0,
        orange: 0,
        yellow: 0,
        lime: 0,
        green: 0,
        mint: 0,
        cyan: 0,
        blue: 0,
        purple: 0,
        magenta: 0,
        pink: 0,
        grey: 0
    };
    
    constructor(palette) {
        this.#palette = palette;

        let container = document.getElementById('counter');

        for (let color in this.#colors) {
            this.#colors[color] = this.#limit;

            let tile = document.createElement('div');
            tile.classList.add('tile', color);
            tile.innerText = this.#limit;

            container.appendChild(tile);
        }
    }

    vacate = (color) => {
        if (!this.#colors.hasOwnProperty(color)) {
            return;
        }

        if (this.#colors[color] < this.#limit) {
            if (this.#colors[color] === 0) {
                this.#enableColor(color);
            }

            this.#colors[color]++;
            this.#updateHtml(color);
        } else {
            throw new Error('The available-to-use count cannot be more than limit (' + this.#limit + ')');
        }
    }

    occupy = (color) => {
        if (!this.#colors.hasOwnProperty(color)) {
            return;
        }

        if (this.#colors[color] > 0) {
            this.#colors[color]--;
            this.#updateHtml(color);

            if (this.#colors[color] === 0) {
                this.#disableColor(color);
            }
        } else {
            throw new Error('You hav reached the limit (' + this.#limit + ') for this color already');
        }
    }

    reset = () => {
        for (let color in this.#colors) {
            this.#colors[color] = this.#limit;
            this.#updateHtml(color);
        }

        document.querySelectorAll('#counter .disabled').forEach((item) => {
            item.classList.remove('disabled');
        });
    }

    #updateHtml = (color) => {
        this.#getCounter(color).innerText = this.#colors[color];
    }

    #enableColor = (color) => {
        this.#getCounter(color).classList.remove('disabled');
        this.#palette.enableColor(color);
    }

    #disableColor = (color) => {
        this.#getCounter(color).classList.add('disabled');
        this.#palette.disableColor(color);
    }

    #getCounter = (color) => {
        return document.querySelector('#counter .tile.' + color);
    }
}
