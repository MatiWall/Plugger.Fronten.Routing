import { InvalidRouteRefError, InvalidPathError } from "./errors";
import { RouteRef } from "./RouteRef/RouteRef"



class RouteResolver {
    routeMapping: Map<string, RouteRef<any>>
    flatMapper:  Map<string, RouteRef<any>>

    constructor(
        routeMapping: Map<string, RouteRef<any>> = new Map()
    ){
        this.routeMapping = routeMapping
        this.flatMapper = new Map<string, RouteRef<any>>()
        
        this.routeMapping.forEach((routeRef, path) => {
            routeRef.validate(path);
            this.addToFlatMapper(routeRef);
        })
        


    }

    addRoute(path: string, routeRef: RouteRef<any>): boolean {
        
        if (this.routeMapping.has(path)) {
            throw new InvalidPathError(`Route with path "${path}" already exists.`);
        }

        if (!(routeRef instanceof RouteRef)){
            throw new InvalidRouteRefError(`routeRef has to be an instance of RouteRef not ${typeof routeRef}`)
        }

        if (!path.startsWith('/')){
            throw new InvalidPathError(`Bind path should start with a / not ${path}`)
        }

        if (path !== '/' && path.endsWith('/')){
            throw new InvalidPathError(`Bind path ${path} can not end with /`)
        }

        routeRef.validate(path);
        this.routeMapping.set(path, routeRef);
        this.addToFlatMapper(routeRef)
        return true
    }

    resolveRoute(path: string): RouteRef<any> | undefined {
        return this.routeMapping.get(path);
    }

    resolveRouteRef(routeRef: RouteRef<any>): string{
        let matched: string | undefined;

        this.routeMapping.forEach((value, key) =>{
            if (value.id === routeRef.id){
                matched = key
            }
        })

        if (matched == undefined) {
            throw new InvalidRouteRefError('RouteRef ' + routeRef + ' does not exists.')
        }

        return matched
    }

    getFromID(id: string): RouteRef<any> | undefined{
        return this.flatMapper.get(id);
    }
    
    private addToFlatMapper(routeRef: RouteRef<any>): void {
        this.flatMapper.set(routeRef.id, routeRef);

        routeRef.subRouteRefs.forEach(subRouteRef => {
            this.addToFlatMapper(subRouteRef);
        });
  }

}

function createRouteResolver({
    routeMapping = new Map()
}: {
    routeMapping?: Map<string, RouteRef<any>>
} = {}){
    return new RouteResolver(routeMapping)
}

export {
    RouteResolver,
    createRouteResolver
}; 