import { TristableError } from "../core/TristableError.js";

/** An NxM matrix. */
export class Matrix {
    #values: number[][];

    /** The number of rows in the `Matrix`. */
    rows: number;

    /** The number of columns in the `Matrix`. */
    cols: number;

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.#values = [];
        for (let i = 0; i < rows; i++) this.#values.push(new Array<number>(cols).fill(0));
    }

    /** Sets a value in the `Matrix`. */
    set(row: number, col: number, val: number): Matrix {
        if (row >= this.rows || col >= this.cols) return this;
        this.#values[row][col] = val;
        return this;
    }

    /** Gets a value in the `Matrix` */
    get(row: number, col: number): number | null {
        return this.#values[row]?.[col] ?? null;
    }

    /** Valies in the `Matrix` in the form `values[row][col]`. */
    get values(): number[][] {
        return structuredClone(this.#values);
    }

    set values(vals: number[][]) {
        if (vals.length != this.rows) throw new TristableError(`Cannot set invalid Matrix dimensions. Trying to set ${vals.length} rows on a ${this.rows}x${this.cols} Matrix.`);
        for (const i of vals) if (i.length != this.cols) throw new TristableError(`Cannot set invalid Matrix dimensions. Trying to set ${i.length} columns on a ${this.rows}x${this.cols} Matrix.`);
        this.#values = vals;
    }

    /** Sets all the values in the `Matrix`. */
    setAll(vals: number[][]): Matrix {
        this.values = vals;
        return this;
    }

    /** Multiplies the `Matrix` with another `Matrix`. Returns `null` if the matrices cannot be multiplied. 
     * 
     * Matrices cannot be multiplied if the number of columns in the `Matrix` do not equal the number of rows in the `Matrix` being multiplied with.
    */
    mul(m: Matrix): Matrix | null {
        if (this.cols != m.rows) return null;

        const res: Matrix = new Matrix(this.rows, m.cols);
        for (let r = 0; r < res.rows; r++) {
            for (let c = 0; c < res.cols; c++) {
                let v = 0;
                for (let i = 0; i < this.cols; i++) v += (this.get(r, i) ?? 0) * (m.get(i, c) ?? 0); 
                res.set(r, c, v);
            }
        }

        return res;
    }

    /** Adds the `Matrix` to another `Matrix`. Returns `null` if the matrices are not the same size. */
    add(m: Matrix): Matrix | null {
        if (this.cols != m.cols || this.rows != m.rows) return null;

        const res: Matrix = new Matrix(this.rows, this.cols);
        for (let r = 0; r < res.rows; r++) for (let c = 0; c < res.cols; c++) res.set(r, c, (this.get(r, c) ?? 0) + (m.get(r, c) ?? 0));

        return res;
    }

    /** Adds another `Matrix` from the `Matrix`. Returns `null` if the matrices are not the same size. */
    sub(m: Matrix): Matrix | null {
        if (this.cols != m.cols || this.rows != m.rows) return null;

        const res: Matrix = new Matrix(this.rows, this.cols);
        for (let r = 0; r < res.rows; r++) for (let c = 0; c < res.cols; c++) res.set(r, c, (this.get(r, c) ?? 0) - (m.get(r, c) ?? 0));

        return res;
    }

    /** Converts the `Matrix` to a string representation. Same as the `string` property. */
    toString(): string {
        return this.string;
    }

    /** Converts the `Matrix` to a string representation. Same as `toString()`. */
    get string(): string {
        return this.values.map((v) => `[${v.join(", ")}]`).join("\n");
    }
}