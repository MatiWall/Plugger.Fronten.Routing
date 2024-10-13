import { InvalidRouteRefError, InvalidPathError } from "./errors";
import { RouteRef } from "./RouteRef"



class RouteResolver {
    routeMapping: Map<string, RouteRef>

    constructor(
        routeMapping: Map<string, RouteRef> = new Map()
    ){
        this.routeMapping = routeMapping

    }

    addRoute(path: string, routeRef: RouteRef): boolean {
        
        if (this.routeMapping.has(path)) {
            throw new InvalidPathError(`Route with path "${path}" already exists.`);
        }

        if (!(routeRef instanceof RouteRef)){
            throw new InvalidRouteRefError('routeRef has to be an instance of RouteRef')
        }

        routeRef.validate(path);
        this.routeMapping.set(path, routeRef);
        return true
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