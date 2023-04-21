
import {
    BITS_PER_ELEMENT,
    countTotalBits,
    getBitPosition,
    getBytePosition,
    getMaxNumForBitDepth,
    isASCIISchema,
    isBooleanSchema,
    isNumberSchema,
} from './helpers';

import type { TSchema } from './types';
import {BitGetter} from "../../hw1/BitGetter";
import {allowNumber} from "./helpers/helpers";

export const encode = (data: Array<number | boolean | string>, schema: TSchema): ArrayBuffer => {
    if(data.length !== schema.length) throw new Error('Data and Schema must be same length')

    const buffer = new ArrayBuffer(Math.ceil(countTotalBits(schema) / BITS_PER_ELEMENT));
    const bView = new Uint8Array(buffer);
    const accessor = new BitGetter(bView);

    for(const [i, el] of data.entries()) {
        const schemaValue = schema[i];
        let position = 0;

        if (typeof el === 'number' && isNumberSchema(schemaValue)) {
            allowNumber(el, schemaValue[0]);
            encodeNumber(accessor, value, nextValuePosition, valueSchema[0]);
        }



        position += schemaValue[0];
    }

    return buffer;
};

const schema = [
        [3, 'number']  // 3 бита число
        [2, 'number']  // 3 бита число
        [1, 'boolean'] // 1 бит логический
        [1, 'boolean'] // 1 бит логический
        [16, 'ascii']  // 16 бит 2 аски символа
];

encode([2, 3, true, false, 'ab'], schema);
