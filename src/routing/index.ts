import { createRouteRef, RouteRef } from "./RouteRef/RouteRef";
import {ExternalRouteRef, createExternalRouteRef} from "./RouteRef/ExternalRouteRef"
import { RouteResolver, createRouteResolver } from "./Resolver";
import {RouteResolverProvider, useRouteResolver} from "./RouterProvider";
import {useRouteRefParams} from "./RouteRef/UseRouteRefParams";
import { bindExternalRouteRef } from "./RouteRef/BindExternalRouteRefs";
import {AppRouter} from "./Router";
import {RoutesBuilder} from "./Routes";
import { RoutableComponent, createRoutableComponent } from "./RoutebleComponent"


export {
    createRouteRef,
    RouteRef,
    ExternalRouteRef,
    createExternalRouteRef,
    RouteResolver,
    createRouteResolver,
    RouteResolverProvider,
    useRouteResolver,
    useRouteRefParams,
    useRouteRef,
    bindExternalRouteRef,
    
    AppRouter, 
    RoutesBuilder,
    RoutableComponent,
    createRoutableComponent
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
import { useRouteRef } from "./RouteRef/UseRouteRef";


export {
    OverLappingParametersError,
    DuplicateParameterError,
    InvalidRouteRefError,
    InvalidPathError
};

