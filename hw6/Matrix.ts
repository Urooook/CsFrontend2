import {BitVector} from "./BitVector";

class Matrix3D {
    #buffer;

    #xSize;
    #ySize;
    #zSize;

    constructor({x, y, z}) {
        this.#xSize = x;
        this.#ySize = y;
        this.#zSize = z;

        this.#buffer = new BitVector(x * y * z);
    }

    get buffer() {
        return this.#buffer;
    }

    #getIndex({x, y, z}) {
        return (y * this.#xSize + x) * this.#ySize + z;
    }

    get({x,y,z}) {
        return this.#buffer[this.#getIndex({x,y,z})];
    }

    set({x,y,z}, value) {
        this.#buffer[this.#getIndex({x,y,z})] = value
    }

    *[Symbol.iterator]() {
        for(let z = 0; z< this.#zSize; z++){
            for(let y = 0; y< this.#ySize; y++){
                for(let x = 0; x< this.#xSize; x++){
                    yield [{x,y,z}, this.get({x,y,z})]
                }
            }
        }
    }
}

// const m = new Matrix3D({x:2, y:2, z: 2});
//
// m.set({x:0,y:0,z:0}, 1);
// m.set({x:1,y:0,z:0}, 2);
//
// m.set({x:0,y:1,z:0}, 3);
// m.set({x:1,y:0,z:1}, 4);
//
// console.log(...m)