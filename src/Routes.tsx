import React, {ReactNode, ReactElement} from 'react';
import {Routes as ReactRoutes, Route  } from "react-router-dom";
import { useRouteResolver } from './RouterProvider';


const Routes = ({children}: {children: ReactElement<typeof Route>[] }) => {

    const routeResolver = useRouteResolver();

    


    return (
        <ReactRoutes>
            {children}
        </ReactRoutes>
    )
}


export {
    Routes,
    Route
}