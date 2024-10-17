import { createRouteRef, RouteRef } from "./RouteRef/RouteRef";
import {ExternalRouteRef, createExternalRouteRef} from "./RouteRef/ExternalRouteRef"
import { RouteResolver } from "./Resolver";
import {RouteResolverProvider, useRouteResolver} from "./RouterProvider";
import {useRouteRefParams} from "./RouteRef/UseRouteRefParams";
import {AppRouter} from "./Router";
import {Routes, Route} from "./Routes";
import { RoutableComponent } from "./RoutebleComponent"


export {
    createRouteRef,
    RouteRef,
    ExternalRouteRef,
    createExternalRouteRef,
    RouteResolver,
    RouteResolverProvider,
    useRouteResolver,
    useRouteRefParams,
    
    AppRouter, 
    Routes, 
    Route, 
    RoutableComponent
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

