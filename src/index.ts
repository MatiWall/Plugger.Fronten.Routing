import { createRouteRef, RouteRef } from "./RouteRef/RouteRef";
import { RouteResolver } from "./Resolver";
import {RouteResolverProvider, useRouteResolver} from "./RouterProvider";
import {useRouteRefParams} from "./RouteRef/UseRouteRefParams" 
import {AppRouter} from "./Router"
import {Routes, Route} from "./Routes"


export {
    createRouteRef,
    RouteRef,
    RouteResolver,
    RouteResolverProvider,
    useRouteResolver,
    useRouteRefParams,
    
    AppRouter, 
    Routes, 
    Route
}

import { getPathParameters } from "./utils";

export {
    getPathParameters
}; 

import { 
    OverLappingParametersError, 
    DuplicateParameterError,
    InvalidRouteRefError,
    InvalidPathError 

} from "./errors";

export {
    OverLappingParametersError,
    DuplicateParameterError,
    InvalidRouteRefError,
    InvalidPathError
};

