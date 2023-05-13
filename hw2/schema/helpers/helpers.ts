import {TDataTypes, TSchema} from "../types";

export const BITS_PER_ELEMENT = 8;

export function getMaxNumForBitDepth(length: number) {
    return -1 >>> (32 - length);
}

/**
 * Возвращает позицию элемента, в котором находится искомая позиция бита
 *
 * @param position Позиция бита без привязки к элементам тип. массива
 * @param bitsPerElement Количество бит в элементе тип. массива
 * @returns Позиция элемента, в котором находится искомая позиция бита
 */
export function getBytePosition(position: number) {
    return Math.floor(position / BITS_PER_ELEMENT);
}

/**
 * Возвращает позицию бита внутри элемента тип. массива
 *
 * @param position Позиция бита без привязки к элементам тип. массива
 * @param bitsPerElement Количество бит в элементе тип. массива
 * @returns бита внутри элемента тип. массива
 */
export function getBitPosition(position: number) {
    return position % BITS_PER_ELEMENT;
}

export function isNumberSchema(schema: any): schema is [number, 'number'] {
    return schema[1] === 'number';
}

export function isBooleanSchema(schema: [number, TDataTypes]): schema is [number, 'boolean'] {
    return schema[1] === 'boolean';
}

export function isASCIISchema(schema: [number, TDataTypes]): schema is [number, 'ascii'] {
    return schema[1] === 'ascii';
}

/**
 * Считает полное количество использованных в схеме бит
 *
 * @param schema Схема кодирования
 * @returns Полное количество использованных бит
 */
export function countTotalBits(schema: any) {
    return schema.reduce((acc, item) => acc + item[0], 0);
}

export const allowNumber = (value: number, limit: number) => {
    if(value > getMaxNumForBitDepth(limit)) {
        throw new Error(`${value} bigger then limit: ${limit}`)
    }
}

export const take = <T>(
    iterableObj: Iterable<T> | IterableIterator<T>,
    count: number,
): IterableIterator<T> => {

    const iterator = iterableObj[Symbol.iterator]();

    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            count -= 1;

            return {
                value: iterator.next().value,
                done: count < 0,
            };
        },
    };
}

export function* teke(
    iterableObj,
    count
) {
    const iterator = iterableObj[Symbol.iterator]();
    const {done, value} = iterator.next();

    if(done || count < 0) return;
    count -= 1;
    yield value;
}

// console.log(123)
// console.log(...teke([1,2,3,4,5], 3))