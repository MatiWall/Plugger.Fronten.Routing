import { RouteRef } from "./RouteRef"



class RouteResolver {
    routeMapping: Map<string, RouteRef>

    constructor(
        routeMapping: Map<string, RouteRef> = new Map()
    ){
        this.routeMapping = routeMapping

    }

    addRoute(path: string, routeRef: RouteRef): void {
        this.routeMapping.set(path, routeRef);
    }

    resolveRoute(path: string): RouteRef | undefined {
        return this.routeMapping.get(path);
    }

}

export {
    RouteResolver
}; 