import {Vertex} from "./Vertex";
import {Matrix2D} from "./Matrix2D";

export class Graph {
    #MAX_VERTS: number = 20;
    #vertexList: Vertex[];
    #matrix: Matrix2D;
    #nVerts: number;
    #defaultValues = new Map();

    constructor(size = 20) {
        this.#MAX_VERTS = size;
        this.#vertexList = new Array(this.#MAX_VERTS);
        this.#matrix = new Matrix2D({x: this.#MAX_VERTS, y: this.#MAX_VERTS});
        this.#nVerts = 0;

        for(let x = 0; x < this.#MAX_VERTS; x++) {
            for(let y = 0; y < this.#MAX_VERTS; y++) {
                this.#matrix.set({x, y}, 0);
            }
        }

        for(let i = 0; i <  this.#MAX_VERTS; i++) {
            this.#defaultValues.set(i, String.fromCharCode(i + 97).toUpperCase())
        }
    }

    addVertex(lab: string) {
        this.#vertexList[this.#nVerts++] = new Vertex(lab);
    }

    addEge(start: number,  end: number, val: number = 1) {
        this.#matrix.set({x:start, y: end}, val);
        this.#matrix.set({x:end, y: start}, val);
    }

    displayVertex(v: number) {
        console.log(this.#vertexList[v].label);
    }

    get matrix() {
        return this.#matrix;
    }

    get MatrixLineSize() {
        return this.#MAX_VERTS
    }

    get defaultValues() {
        return this.#defaultValues;
    }
}