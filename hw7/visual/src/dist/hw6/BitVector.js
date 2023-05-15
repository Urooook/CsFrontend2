"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BitVector_instances, _BitVector_buffer, _BitVector_length, _BitVector_capacity, _BitVector_grow;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitVector = void 0;
class BitVector {
    constructor(capacity = 8) {
        _BitVector_instances.add(this);
        _BitVector_buffer.set(this, void 0);
        _BitVector_length.set(this, 0);
        _BitVector_capacity.set(this, void 0);
        __classPrivateFieldSet(this, _BitVector_capacity, capacity, "f");
        __classPrivateFieldSet(this, _BitVector_buffer, new Uint8Array(Math.ceil(capacity / 8)), "f");
    }
    get buffer() {
        return __classPrivateFieldGet(this, _BitVector_buffer, "f");
    }
    get(index) {
        const pos = Math.floor(index / 8);
        if (pos >= __classPrivateFieldGet(this, _BitVector_buffer, "f").length) {
            return undefined;
        }
        return (__classPrivateFieldGet(this, _BitVector_buffer, "f")[pos] & (1 << (index % 8))) > 0 ? 1 : 0;
    }
    set(index, value) {
        const pos = Math.floor(index / 8);
        if (pos >= __classPrivateFieldGet(this, _BitVector_capacity, "f")) {
            throw new ReferenceError('Invalid Index');
        }
        if (value === 1) {
            __classPrivateFieldGet(this, _BitVector_buffer, "f")[pos] |= (1 << (index % 8));
        }
        else {
            __classPrivateFieldGet(this, _BitVector_buffer, "f")[pos] &= ~(1 << (index % 8));
        }
    }
    push(value) {
        var _a;
        if (__classPrivateFieldGet(this, _BitVector_length, "f") >= __classPrivateFieldGet(this, _BitVector_capacity, "f")) {
            __classPrivateFieldGet(this, _BitVector_instances, "m", _BitVector_grow).call(this);
        }
        this.set(__classPrivateFieldGet(this, _BitVector_length, "f"), value);
        __classPrivateFieldSet(this, _BitVector_length, (_a = __classPrivateFieldGet(this, _BitVector_length, "f"), _a++, _a), "f");
    }
}
exports.BitVector = BitVector;
_BitVector_buffer = new WeakMap(), _BitVector_length = new WeakMap(), _BitVector_capacity = new WeakMap(), _BitVector_instances = new WeakSet(), _BitVector_grow = function _BitVector_grow() {
    __classPrivateFieldSet(this, _BitVector_capacity, __classPrivateFieldGet(this, _BitVector_capacity, "f") * 2, "f");
    const buffer = __classPrivateFieldGet(this, _BitVector_buffer, "f");
    const newBuffer = new Uint8Array(Math.ceil(__classPrivateFieldGet(this, _BitVector_capacity, "f") / 8));
    newBuffer.set(buffer, 0);
    __classPrivateFieldSet(this, _BitVector_buffer, newBuffer, "f");
};
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
