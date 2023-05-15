import {BitVector} from "./BitVector";

export class Matrix2D {
    #buffer;
    #xSize;
    #ySize;

    constructor({x, y}) {
        this.#xSize = x;
        this.#ySize = y;

        this.#buffer = new BitVector(x * y);
    }

    get buffer() {
        return this.#buffer;
    }

    #getIndex({x, y}) {
        return y * this.#xSize + x;
    }

    get({x,y}) {
        return this.#buffer[this.#getIndex({x,y})];
    }

    set({x,y}, value) {
        this.#buffer[this.#getIndex({x,y})] = value
    }

    *[Symbol.iterator]() {
            for(let y = 0; y< this.#ySize; y++){
                for(let x = 0; x< this.#xSize; x++){
                    yield [{x,y}, this.get({x,y})]
                }
            }
    }
}

// const m = new Matrix2D({x:2, y:2 });
//
// m.set({x:0, y:0}, 1)
// m.set({x:1, y:0}, 3)
// m.set({x:0, y:1}, 2)
//
// console.log(m.get({x:1, y:0}))
// console.log(m.get({x:0, y:0}))

// console.log(...m);