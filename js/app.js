import Bottle from './bottle.js'
import Palette from './palette.js'
import Counter from './counter.js';

class App {
    #DEFAULT_COUNT = 14;

    #palette = new Palette();
    #counter = new Counter(this.#palette);

    constructor() {
        this.createBottles(this.#DEFAULT_COUNT);
        this.#palette.observe();
    }

    observe = () => {
        document.getElementById('down').addEventListener('click', (e) => {
            this.#decreaseCount();
            e.stopImmediatePropagation();
        });

        document.getElementById('up').addEventListener('click', (e) => {
            this.#increaseCount();
            e.stopImmediatePropagation();
        });
    }

    createBottles = (count) => {
        let area = document.getElementById('area');

        area.className = '';
        area.classList.add('w' + Math.ceil(count / 2));

        for (let i = 0; i < count - 2; i++) {
            new Bottle(i, this.#palette, this.#counter);
        }

        for (let i = 0; i < 2; i++) {
            new Bottle();
        }

        this.observe();
    }

    #reset = (count = this.#DEFAULT_COUNT) => {
        document.getElementById('area').innerHTML = '';
        this.#counter.reset();
        this.#palette.reset();
        this.createBottles(count)
    }

    #decreaseCount = () => {
        let countBox = document.getElementById('bottles_count'),
            count = parseInt(countBox.innerText);

        if (count <= 7) {
            countBox.innerText = 7;

            return;
        }

        countBox.innerText = --count;

        this.#reset(count);
    }

    #increaseCount = () => {
        let countBox = document.getElementById('bottles_count'),
            count = parseInt(countBox.innerText);

        if (count >= 14) {
            countBox.innerText = 14;

            return;
        }

        countBox.innerText = ++count;

        this.#reset(count);
    }
}

(new App()).observe();