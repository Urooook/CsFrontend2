export type UintArrayBit = 1 | 0;

export interface IBitGetter {
    get: (elem: number, bit: number) => number | null
    set(elem: number, bit: number, value: UintArrayBit): void
}

export interface ICheckParams {
    elem: number;
    bit: number;
    size: number;
}