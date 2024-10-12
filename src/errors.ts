// src/errors.ts
class OverLappingParametersError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SubRouteError";
    }
}

class DuplicateParameterError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SubRouteError";
    }
}

export { OverLappingParametersError, DuplicateParameterError };
