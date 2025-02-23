import React, {ReactNode} from 'react';
import { BrowserRouter, useInRouterContext } from "react-router-dom";
import { RouteResolverProvider } from './RouterProvider';
import { RouteResolver } from './Resolver';

const AppRouter = ({children, resolver}: {children: ReactNode, resolver: RouteResolver}) => {

    if (resolver === undefined){
        throw new Error('AppRouter need a resolver of type RouterResolver')
    }

    const isInRouter = useInRouterContext();

    return (
        <BrowserRouter>
            <RouteResolverProvider resolver={resolver}>
                {children}
            </RouteResolverProvider>
        </BrowserRouter>
    )
}

export {
    AppRouter
}