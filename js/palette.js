export default class Palette {
    #palette = document.getElementById('palette');
    #targetTileId = null;

    constructor() {
        let tiles = [
                'red', 'orange', 'yellow', 'lime', 'green', 'mint', 'cyan',
                'blue', 'purple', 'magenta', 'pink', 'grey', 'fake', 'undefined'
            ];

        tiles.forEach((color) => {
            let tile = document.createElement('div')
            tile.classList.add('tile', color);

            this.#palette.appendChild(tile);
        });
    }

    observe = () => {
        document.querySelectorAll('#palette .tile:not(.fake)').forEach((tile) => {
            tile.addEventListener('click', () => {
                if (!tile.classList.contains('disabled')) {
                    this.#selectColor(tile);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (this.#palette.classList.contains('show') && !this.#palette.contains(e.target)) {
                this.#hide();
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key === "Escape") {
                this.#hide()
            }
        });
    }

    show = (x, y, targetTileId) => {
        this.#targetTileId = targetTileId;

        this.#palette.style.left = x + 'px';
        this.#palette.style.top = y + 'px';

        this.#palette.classList.add('show');
    }

    #hide = () => {
        this.#palette.classList.remove('show');
        this.#targetTileId = null;
    }

    #selectColor = (tile) => {
        let classes = tile.classList,
            color = classes.item(classes.length - 1);

        document.dispatchEvent(
            new CustomEvent('color-chosen', {detail: {color: color, targetId: this.#targetTileId}})
        );

        this.#hide();
    }

    disableColor = (color) => {
        document.querySelector('#palette .tile.' + color).classList.add('disabled');
    }

    enableColor = (color) => {
        document.querySelector('#palette .tile.' + color).classList.remove('disabled');
    }
}
