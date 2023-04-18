/** A custom error type for Tristable Engine. Called when something goes wrong inside the engine, or if the engine is not used correctly. */
export class TristableError extends Error {
    constructor(message) {
        super(message);
        this.name = "TristableError";
    }
}
