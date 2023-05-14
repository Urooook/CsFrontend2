function createMask(size, offset = 0) {
    return ( 2**32 - 1 >>> 32 - size) << offset;
}
//
// console.log(257 & createMask(1))

class TypedStack {
    #array;
    #maxSize: number;
    #maxValue: number;
    #head = null;
    #headIndex: number = -1

    constructor(viewDataClass: any, size: number) {
        this.#maxSize = size;
        this.#array = new viewDataClass(size);
        this.#maxValue = 2 ** (this.#array.BYTES_PER_ELEMENT * 8) - 1;
    }

    get head() {
        return this.#head;
    }

    get buffer() {
        return this.#array;
    }

    isEmpty() {
        return this.#head === null;
    }

    isFull() {
        return this.#headIndex === this.#maxSize - 1;
    }

    push(value: string | number) {
        if(this.isFull()) {
            throw new Error('Stack is full');
        }

        const currentVal = typeof value === 'string' ? value.charCodeAt(0) : value;

        if(currentVal >= this.#maxValue) {
            throw new Error(`The passed value ${currentVal} is too large. Max is ${this.#maxValue}`);
        }

        this.#headIndex++;
        this.#head = value;

        this.#array[this.#headIndex] |= currentVal;
    }
    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }

        const deleted =  this.#array[this.#headIndex];
        this.#array[this.#headIndex] = 0;
        this.#headIndex--;

        if (this.#headIndex === -1) {
            this.#head = null;
        } else {
            this.#head = this.#array[this.#headIndex];
        }

        return deleted;
    }


}



// const stack = new TypedStack(Int32Array, 10);
//
// stack.push(10)
// stack.push(12)
// stack.push(13)
// try{
//     stack.push(256)
// } catch (err) {
//     console.log(err);
// }
// // stack.pop()
//
// console.log(stack.buffer);

