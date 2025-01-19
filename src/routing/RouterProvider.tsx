import React, {createContext, useContext, ReactNode} from 'react';
import { RouteResolver } from './Resolver';
import { Route } from './types';

const RouteResolverContext = createContext<RouteResolver>( new RouteResolver() );

const RouteResolverProvider = ({children, resolver}: {children: ReactNode, resolver: RouteResolver}) => {
    const routeResolver: RouteResolver = resolver;

    return (
        <RouteResolverContext.Provider value={routeResolver}>
            {children}
        </RouteResolverContext.Provider>
    )
}

const useRouteResolver = (): RouteResolver => {
    const context = useContext(RouteResolverContext);
    if (!context) {
        throw new Error("useRouteResolver must be used within a RouteResolverProvider. No route resolver available.");
    }
    return context;
};


export {
    RouteResolverProvider, 
    useRouteResolver
}