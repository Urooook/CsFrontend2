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
var _Graph_MAX_VERTS, _Graph_vertexList, _Graph_matrix, _Graph_nVerts, _Graph_defaultValues;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const Vertex_1 = require("./Vertex");
const Matrix2D_1 = require("./Matrix2D");
class Graph {
    constructor(size = 20) {
        _Graph_MAX_VERTS.set(this, 20);
        _Graph_vertexList.set(this, void 0);
        _Graph_matrix.set(this, void 0);
        _Graph_nVerts.set(this, void 0);
        _Graph_defaultValues.set(this, new Map());
        __classPrivateFieldSet(this, _Graph_MAX_VERTS, size, "f");
        __classPrivateFieldSet(this, _Graph_vertexList, new Array(__classPrivateFieldGet(this, _Graph_MAX_VERTS, "f")), "f");
        __classPrivateFieldSet(this, _Graph_matrix, new Matrix2D_1.Matrix2D({ x: __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f"), y: __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f") }), "f");
        __classPrivateFieldSet(this, _Graph_nVerts, 0, "f");
        for (let x = 0; x < __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f"); x++) {
            for (let y = 0; y < __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f"); y++) {
                __classPrivateFieldGet(this, _Graph_matrix, "f").set({ x, y }, 0);
            }
        }
        for (let i = 0; i < __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f"); i++) {
            __classPrivateFieldGet(this, _Graph_defaultValues, "f").set(i, String.fromCharCode(i + 97).toUpperCase());
        }
    }
    addVertex(lab) {
        var _a, _b;
        __classPrivateFieldGet(this, _Graph_vertexList, "f")[__classPrivateFieldSet(this, _Graph_nVerts, (_b = __classPrivateFieldGet(this, _Graph_nVerts, "f"), _a = _b++, _b), "f"), _a] = new Vertex_1.Vertex(lab);
    }
    addEge(start, end, val = 1) {
        __classPrivateFieldGet(this, _Graph_matrix, "f").set({ x: start, y: end }, val);
        __classPrivateFieldGet(this, _Graph_matrix, "f").set({ x: end, y: start }, val);
    }
    displayVertex(v) {
        console.log(__classPrivateFieldGet(this, _Graph_vertexList, "f")[v].label);
    }
    get matrix() {
        return __classPrivateFieldGet(this, _Graph_matrix, "f");
    }
    get MatrixLineSize() {
        return __classPrivateFieldGet(this, _Graph_MAX_VERTS, "f");
    }
    get defaultValues() {
        return __classPrivateFieldGet(this, _Graph_defaultValues, "f");
    }
}
exports.Graph = Graph;
_Graph_MAX_VERTS = new WeakMap(), _Graph_vertexList = new WeakMap(), _Graph_matrix = new WeakMap(), _Graph_nVerts = new WeakMap(), _Graph_defaultValues = new WeakMap();
