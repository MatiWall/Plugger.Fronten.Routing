import { RouteRef } from "./RouteRef";
import { SubRouteRef } from "./SubRouteRef";
import { useRouteResolver } from "./RouterProvider";
import { InvalidRouteRefError } from "./errors";


function useRouteRef(
    routeRef: RouteRef | SubRouteRef,
){

    const resolver = useRouteResolver();

    let path: string;

    if (routeRef instanceof RouteRef){
        path = resolver.resolveRouteRef(routeRef);
    }
    else if (routeRef instanceof SubRouteRef) {
        const basePath = resolver.resolveRouteRef(routeRef.parent);
        
        path = basePath + routeRef.path

    }
    else {

        throw new InvalidRouteRefError('Unknown RouteRef '+ routeRef)
    }


    const routeGenerator = () => {

    }

    return routeGenerator
}

export {
    useRouteRef
};