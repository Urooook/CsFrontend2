
import {
    BITS_PER_ELEMENT,
    countTotalBits,
    getBitPosition,
    getBytePosition,
    getMaxNumForBitDepth,
    isASCIISchema,
    isBooleanSchema,
    isNumberSchema,
    allowNumber
} from './helpers/helpers';

import type { TSchema } from './types';
import {BitGetter} from "../../hw1/BitGetter";

// function getBitOperationValue(type: string, value: number, index: number, limit: number): 1|0 {
//     switch (type) {
//         case 'number': {
//             return (value & (1 << index)) > 0 ? 1 : 0
//         }
//         case 'boolean': {
//             return value && index === limit - 1 ? 1 : 0;
//         }
//     }
// }
//
// export function setBitsInAccessor (accessor: BitGetter) {
//    return function (value: any, nextPosition: number, size: number, type: string) {
//        for (let index = 0; index < size; index++) {
//            const byteIndex = getBytePosition(nextPosition + index);
//            const bitIndex = getBitPosition(nextPosition + index);
//
//            accessor.set(byteIndex, bitIndex, getBitOperationValue(type, value, index, size))
//        }
//        console.log(accessor)
//        // console.log(accessor.get(0, 0))
//        // console.log(accessor.get(0, 1))
//        // console.log(accessor.get(0, 2))
//        // console.log(accessor.get(0, 3))
//    }
// }
//
// export const encode = (data: Array<number | boolean | string>, schema: any): ArrayBuffer => {
//     // if(data.length !== schema.length) throw new Error('Data and Schema must be same length')
//
//     const buffer = new ArrayBuffer(Math.ceil(countTotalBits(schema) / BITS_PER_ELEMENT));
//     const bView = new Uint8Array(buffer);
//     const accessor = new BitGetter(bView);
//
//     const encoder =  setBitsInAccessor(accessor);
//     let position = 0;
//     for(const [i, el] of data.entries()) {
//         const schemaValue = schema[i];
//
//
//         if (typeof el === 'number' && isNumberSchema(schemaValue)) {
//             allowNumber(el, schemaValue[0]);
//             encoder(el, position, schemaValue[0], schemaValue[1])
//         }
//
//         if (typeof el === 'boolean' && isBooleanSchema(schemaValue)) {
//             // allowNumber(el, schemaValue[0]);
//             encoder(el, position, schemaValue[0], schemaValue[1])
//         }
//
//         // console.log('schemaValue[0]', schemaValue[0])
//
//         position += schemaValue[0];
//     }
//     console.log('----------------------------')
//     console.log(accessor.get(0, 0))
//     console.log(accessor.get(0, 1))
//     console.log(accessor.get(0, 2))
//     console.log(accessor.get(0, 3))
//     console.log(accessor.get(0, 4))
//     console.log(accessor.get(0, 5))
//     console.log(accessor.get(0, 6))
//     console.log(accessor.get(0, 7))
//     console.log('---')
//     console.log(accessor.get(1, 0))
//     console.log(accessor.get(1, 1))
//     console.log(accessor.get(1, 2))
//     console.log('----------------------------')
//
//
//     return buffer;
// };

const schema = [
    [3, 'number'],  // 3 бита число
    [2, 'number'],  // 2 бита число
    [1, 'boolean'], // 1 бит логический
    [1, 'boolean'], // 1 бит логический
    [16, 'ascii']  // 16 бит 2 аски символа
];

// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.


const normalizeSchema = (schema: any) => {
    return schema.flatMap(([size, type]) => {
       if(type === 'ascii') {
           const res = new Array(size / 8);
           for(let i = 0; i<res.length; i++) {
               res[i] = [8, {
                   type,
                   partial: i > 0
               }]
           }

           return res;
       }

       return [[size, {type, partial: false}]]
    })
}

function getViewMaxSize(normalizedSchema) {
    return Math.max(...normalizedSchema.map(([size]) => size <= 8 ? 8 : size <= 16 ? 16 : 32))
}

function getOffsets(normalizedSchema: any[]) {
    const size = getViewMaxSize(normalizedSchema);
    const offsets: any[] = [];

   loop: for(let i =0, el=0; i< normalizedSchema.length; el++){
        let offset = 0;

        while(offset + normalizedSchema[i][0] <= size) {
            const cur = normalizedSchema[i];

            offsets.push([cur[0], {...cur[1], offset,  index: el}]);

            offset += cur[0];
            i++;

            if(i === normalizedSchema.length){
                break loop;
            }
        }
    }

    return offsets;
}

function createMask(size, offset = 0) {
    return ( 2**32 - 1 >>> 32 - size) << offset;
}

function encode(data, schema) {
    const normalizedSchema = normalizeSchema(schema);
    const sizeView = getViewMaxSize(normalizedSchema);
    const offsets: any = getOffsets(normalizedSchema);
    const buffer = new globalThis[`Uint${sizeView}Array`](offsets.at(-1)[1].index + 1);
    // console.log(offsets)
    function* dataIterator() {
        for(const el of data){
            if(typeof el === 'string'){
                yield* el
            } else {
                yield el
            }
        }
    }

    const iter = dataIterator();

    offsets.forEach(([size, {offset, index, type}]) => {
        const {value, done} = iter.next();
        // console.log(type)
        if(done) {
            throw new TypeError('Schema mismatched');
        }

        const bytes = type === 'ascii' ? value.charCodeAt(0) : value;

        // if((bytes & createMask(size, offset)) !== bytes){
        //     throw new TypeError('Schema mismatched');
        // }
        // console.log(index, )
        buffer[index] |= (bytes & createMask(size)) << offset
        // console.log(buffer[index])
    });

    // console.log(...dataIterator())
    return buffer.buffer;
}

function decode(data, schema) {
    const normalizedSchema = normalizeSchema(schema);
    const sizeView = getViewMaxSize(normalizedSchema);
    const offsets: any = getOffsets(normalizedSchema);
    const buffer = new globalThis[`Uint${sizeView}Array`](data);

    const res = [];

    offsets.forEach(([size, {offset, index, type, partial}]) => {
        const bytes = (buffer[index] & createMask(size, offset)) >> offset;

        switch (type){
            case 'number': {
                res.push(bytes);
                break;
            }
            case 'boolean': {
                res.push(bytes > 0 ? true : false);
                break;
            }
            case 'ascii': {
                const char = String.fromCharCode(bytes);

                if(partial) {
                    res[res.length - 1] += char;
                } else {
                    res.push(char)
                }
                break;
            }
        }
    });

    return res;
}

// console.log(getOffsets(normalizeSchema(schema)))
console.log(decode(encode([2, 3, true, false, 'ab'], schema), schema));
// const data = encode([2, 3, true, false, 'ab'], schema);


