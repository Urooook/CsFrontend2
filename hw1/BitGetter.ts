import {IBitGetter, ICheckParams, UintArrayBit} from "./types";

export class BitGetter implements IBitGetter {
    buffer: Uint8Array;
    elemSize: number;

    constructor(unitArray: Uint8Array) {
        this.buffer = unitArray;
        this.elemSize = unitArray.byteLength - 1;
    }

    get(elem: number, bit: number): number | null {
        if (this.checkInputData({ elem, bit, size: this.elemSize })) {
            return Number((this.buffer[elem] & (1 << bit)) !== 0);
        }
        return null;
    }

    set(elem: number, bit: number, value: UintArrayBit): void {
        if (
            !this.checkInputData({ elem, bit, size: this.elemSize }) &&
            !this.checkSetBitData(value)
        )
            return null;

        if (value === 1) {
            this.buffer[elem] = this.buffer[elem] | (1 << bit);
        } else {
            this.buffer[elem] = this.buffer[elem] & ~(1 << bit);
        }
    }


    checkInputData({ elem, bit, size }: ICheckParams): boolean {
        const isValidElem = elem <= size && elem >= 0;
        const isValidBit = bit >= 0 && bit < 8;

        if (!isValidElem) console.error("Wrong array index");
        if (!isValidBit) console.error("Wrong bit index");

        return isValidElem && isValidBit;
    }

    checkSetBitData(value: UintArrayBit): boolean {
        const isValidData = value === 0 || value === 1;
        if (!isValidData) console.error("Wrong value data");
        return isValidData;
    }
}

const bitGetter = new BitGetter(new Uint8Array([0b1110, 0b1101]));

console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0
console.log(bitGetter.set(0, 1, 0)); //
console.log(bitGetter.get(0, 1));    // 0