import { RouteRef } from "./RouteRef";
import { SubRouteRef } from "./deletedSubRouteRef";
import { useRouteResolver } from "../RouterProvider";
import { InvalidRouteRefError } from "../errors";


function useRouteRef(
    routeRef: RouteRef | SubRouteRef,
){

    const resolver = useRouteResolver();

    let path: string;
    let params: string[];

    if (routeRef instanceof RouteRef){
        path = resolver.resolveRouteRef(routeRef);
        params = routeRef.params;
    }
    else if (routeRef instanceof SubRouteRef) {
        const basePath = resolver.resolveRouteRef( routeRef.parent);
        
        path = basePath + routeRef.path
        params = routeRef.parent.params.concat(routeRef.params) 
    }
    else {

        throw new InvalidRouteRefError('Unknown RouteRef '+ routeRef)
    }


    type RouteParams = { [K in typeof params[number]]: string };

    const routeGenerator = (input: RouteParams): string => {
        let generatedPath = path;

        params.forEach((param) => {
            if (!input.hasOwnProperty(param)) {
                throw new Error(`Missing parameter: ${param}`);
            }
       
            generatedPath = generatedPath.replace(`:${param}`, input[param]);
        });

        return generatedPath;
    };

    return routeGenerator
}

export {
    useRouteRef
};