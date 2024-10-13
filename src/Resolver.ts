import { InvalidRouteRefError } from "./errors";
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

    resolveRouteRef(routeRef: RouteRef){
        let matched: string | undefined;

        this.routeMapping.forEach((value, key) =>{
            if (value === routeRef){
                matched = key
            }
        })

        if (matched == undefined) {
            throw new InvalidRouteRefError('RouteRef ' + routeRef + ' does not exists.')
        }

        return matched
    }

}

export {
    RouteResolver
}; 