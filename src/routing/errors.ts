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

class InvalidRouteRefError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RouteError";
    }
}

class InvalidPathError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RouteError";
    }
}

class InvalidComponentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ComponentError";
    }
}

export { 
    OverLappingParametersError, 
    DuplicateParameterError,
    InvalidRouteRefError,
    InvalidPathError, 
    InvalidComponentError
};
