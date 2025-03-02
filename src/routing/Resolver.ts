import { InvalidRouteRefError, InvalidPathError } from "./errors";
import { RouteRef } from "./RouteRef/RouteRef"



class RouteResolver {
    routeMapping: Map<string, RouteRef<any>[]>
    flatMapper:  Map<string, RouteRef<any>>

    constructor(
        routeMapping: Map<string, RouteRef<any>[]> = new Map()
    ){
        this.routeMapping = routeMapping
        this.flatMapper = new Map<string, RouteRef<any>>()
        
        this.routeMapping.forEach((routeRefs, path) => {
            routeRefs.forEach(routeRef => {
                routeRef.validate(path);
                this.addToFlatMapper(routeRef);
            });
        });
        


    }

    addRoute(path: string, routeRef: RouteRef<any>): boolean {
        

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

        if (this.routeMapping.has(path)) {
            const existingRoutes = this.routeMapping.get(path)!;
            if (existingRoutes.some(existingRoute => this.matchParams(existingRoute, routeRef.params))) {
                throw new InvalidPathError(`Route with path "${path}" and the same params already exists.`);
            }
        } else {
            this.routeMapping.set(path, []);
        }

        this.routeMapping.get(path)!.push(routeRef);
        this.addToFlatMapper(routeRef);

        return true
    }
    resolveRoute(path: string, params?: string[]): RouteRef<any> | undefined {
        const routeRefs = this.routeMapping.get(path);
        if (!routeRefs) return undefined;

        if (!params || Object.keys(params).length === 0) {
            return routeRefs[0]; // Default to the first one if no params are given
        }

        return routeRefs.find(routeRef => this.matchParams(routeRef, params));
    }

    resolveRouteRef(routeRef: RouteRef<any>): string {
        for (const [path, routeRefs] of this.routeMapping.entries()) {
            if (routeRefs.some(ref => ref.id === routeRef.id)) {
                return path;
            }
        }
        throw new InvalidRouteRefError(`RouteRef ${routeRef.id} does not exist.`);
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

  private matchParams(routeRef: RouteRef<any>, params: string[]): boolean {
    if (!routeRef.params) return true;
    return routeRef.params.length === params.length;
}

}

function createRouteResolver({
    routeMapping = new Map()
}: {
    routeMapping?: Map<string, RouteRef<any>[]>
} = {}){
    return new RouteResolver(routeMapping)
}

export {
    RouteResolver,
    createRouteResolver
}; 