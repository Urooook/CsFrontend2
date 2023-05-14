export class BitVector {
    #buffer;
    #length = 0;
    #capacity;

    constructor(capacity = 8){
        this.#capacity = capacity;
        this.#buffer = new Uint8Array(Math.ceil(capacity / 8));
    }

    get buffer() {
        return this.#buffer
    }

    get(index) {
        const pos = Math.floor(index / 8);

        if(pos >= this.#buffer.length) {
           return undefined;
        }

        return (this.#buffer[pos] & (1 << (index % 8))) > 0 ? 1 : 0;
    }

    set(index, value) {
        const pos = Math.floor(index / 8);

        if(pos >= this.#capacity) {
            throw new ReferenceError('Invalid Index');
        }

        if(value === 1){
            this.#buffer[pos] |= (1 << (index % 8))
        } else {
            this.#buffer[pos] &= ~(1 << (index % 8))
        }
    }

    push(value) {
        if(this.#length >= this.#capacity){
            this.#grow();
        }

        this.set(this.#length, value);
        this.#length++;
    }

    #grow() {
        this.#capacity *= 2;
        const buffer = this.#buffer;
        const newBuffer = new Uint8Array(Math.ceil(this.#capacity/ 8));

        newBuffer.set(buffer, 0);

        this.#buffer = newBuffer;
    }
}

// const vec = new BitVector(4);
//
// vec.push(1)
// vec.push(0)
// vec.push(1)
// vec.push(1)
// console.log(vec.get(0))
// console.log(vec.get(1))
// console.log(vec.buffer)
// vec.push(0)
// vec.push(1)
// vec.push(1)
// vec.push(1)
// console.log(vec.buffer)
//
//
//
// vec.push(0)
// vec.push(1)
//
// console.log(vec.buffer)
// console.log(vec.get(9))
// console.log(vec.get(10))