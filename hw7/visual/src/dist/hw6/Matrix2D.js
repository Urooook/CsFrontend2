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
var _Matrix2D_instances, _Matrix2D_buffer, _Matrix2D_xSize, _Matrix2D_ySize, _Matrix2D_getIndex;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix2D = void 0;
const BitVector_1 = require("./BitVector");
class Matrix2D {
    constructor({ x, y }) {
        _Matrix2D_instances.add(this);
        _Matrix2D_buffer.set(this, void 0);
        _Matrix2D_xSize.set(this, void 0);
        _Matrix2D_ySize.set(this, void 0);
        __classPrivateFieldSet(this, _Matrix2D_xSize, x, "f");
        __classPrivateFieldSet(this, _Matrix2D_ySize, y, "f");
        __classPrivateFieldSet(this, _Matrix2D_buffer, new BitVector_1.BitVector(x * y), "f");
    }
    get buffer() {
        return __classPrivateFieldGet(this, _Matrix2D_buffer, "f");
    }
    get({ x, y }) {
        return __classPrivateFieldGet(this, _Matrix2D_buffer, "f")[__classPrivateFieldGet(this, _Matrix2D_instances, "m", _Matrix2D_getIndex).call(this, { x, y })];
    }
    set({ x, y }, value) {
        __classPrivateFieldGet(this, _Matrix2D_buffer, "f")[__classPrivateFieldGet(this, _Matrix2D_instances, "m", _Matrix2D_getIndex).call(this, { x, y })] = value;
    }
    *[(_Matrix2D_buffer = new WeakMap(), _Matrix2D_xSize = new WeakMap(), _Matrix2D_ySize = new WeakMap(), _Matrix2D_instances = new WeakSet(), _Matrix2D_getIndex = function _Matrix2D_getIndex({ x, y }) {
        return y * __classPrivateFieldGet(this, _Matrix2D_xSize, "f") + x;
    }, Symbol.iterator)]() {
        for (let y = 0; y < __classPrivateFieldGet(this, _Matrix2D_ySize, "f"); y++) {
            for (let x = 0; x < __classPrivateFieldGet(this, _Matrix2D_xSize, "f"); x++) {
                yield [{ x, y }, this.get({ x, y })];
            }
        }
    }
}
exports.Matrix2D = Matrix2D;
// const m = new Matrix2D({x:2, y:2 });
//
// m.set({x:0, y:0}, 1)
// m.set({x:1, y:0}, 3)
// m.set({x:0, y:1}, 2)
//
// console.log(m.get({x:1, y:0}))
// console.log(m.get({x:0, y:0}))
// console.log(...m);
