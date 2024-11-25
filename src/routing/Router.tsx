import React, {ReactNode} from 'react';
import { BrowserRouter } from "react-router-dom";
import { RouteResolverProvider } from './RouterProvider';

const AppRouter = ({children}: {children: ReactNode}) => {

    return (
        <BrowserRouter>
            <RouteResolverProvider>
                {children}
            </RouteResolverProvider>
        </BrowserRouter>
    )
}

export {
    AppRouter
}