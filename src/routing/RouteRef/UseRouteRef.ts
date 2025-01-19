import { RouteRef } from "./RouteRef";
import { useRouteResolver } from "../RouterProvider";
import { InvalidRouteRefError } from "../errors";
import { RouteResolver } from "../Resolver";
import { useLocation, useParams } from 'react-router-dom'
import { ExternalRouteRef } from "./ExternalRouteRef";

function findRouteRefParent(routeRef: RouteRef, resolver: RouteResolver){
    const parentID: string | undefined = routeRef.parentID;
    if (parentID) {
        const parentRouteRef: RouteRef | undefined = resolver.getFromID(parentID);
        return parentRouteRef
    }
}


function findRouteRefParents(routeRef: RouteRef, resolver: RouteResolver){

    let parentRouteRefs: RouteRef[] = [];

    let currentRouteRef: RouteRef | undefined = routeRef;

    while (currentRouteRef) {
        const parentRouteRef = findRouteRefParent(currentRouteRef, resolver);
        if (parentRouteRef) {
            parentRouteRefs.push(parentRouteRef);
            currentRouteRef = parentRouteRef; // Move to the next parent
        } else {
            break; // No more parents
        }
    }

    return parentRouteRefs.reverse();
}

function useRouteRef(
    routeRef: RouteRef | ExternalRouteRef,
){

    if (routeRef instanceof ExternalRouteRef){
        routeRef = routeRef.getRouteRefTarget()
    }

    const paramsFromUrl = useParams();
    const resolver = useRouteResolver();
    let basePath: string;
    const parentRouteRefs: RouteRef[] = findRouteRefParents(routeRef, resolver);

    if (parentRouteRefs.length == 0){
        basePath = resolver.resolveRouteRef(routeRef);
    }else {
        basePath = resolver.resolveRouteRef(parentRouteRefs[0]);
    }

    let path: string = '';
    let params: string[] = [];

    parentRouteRefs.forEach((item) => {
        path = `${path}${item.path}`;
        params = params.concat(item.params);
    });

    path = path.endsWith('/') || routeRef.path.startsWith('/') ? `${path}${routeRef.path}` : `${path}/${routeRef.path}`;
    params = params.concat(routeRef.params);

    // throw new InvalidRouteRefError('Unknown RouteRef '+ routeRef)



    type RouteParams = { [K in typeof params[number]]: string };

    const routeGenerator = (input: RouteParams = {}): string => {
        let generatedPath = path;

        params.forEach((param) => {
            const valueFromUrl = paramsFromUrl[param];
            if (valueFromUrl){
                generatedPath = generatedPath.replace(`:${param}`, valueFromUrl);
            }
            else {
                if (!input.hasOwnProperty(param)){
                throw new Error(`Missing parameter: ${param}`);
                }
                generatedPath = generatedPath.replace(`:${param}`, input[param]);
            }
       
            
        });

        const fullPath = `${basePath.replace(/\/+$/, '')}/${generatedPath.replace(/^\/+/, '')}`; // Ensure only one /

        return fullPath;
    };

    return routeGenerator
}

export {
    useRouteRef
};