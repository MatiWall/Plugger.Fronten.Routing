import React, {ReactNode, ReactElement} from 'react';
import {Routes as ReactRoutes, Route  } from "react-router-dom";
import { useRouteResolver } from './RouterProvider';
import { RouteRef } from './RouteRef/RouteRef';
import { RouteMap } from './types';
import { RoutableComponent } from './RoutebleComponent';


const renderNestedList = (routeRef: RouteRef, flatMap: Record<string, RoutableComponent>): JSX.Element => {
    const subRouteRefs: RouteRef[] = routeRef.subRouteRefs || [];
    const relevantBinds: RoutableComponent[] = subRouteRefs.map(subRouteRef => flatMap[subRouteRef.id]);
  
    return (
      <>
        {relevantBinds.map((item, index) => {
          return (<Route key={item.mountPoint.path} path={item.mountPoint.path} element={item.component}>
            {item.mountPoint.subRouteRefs && renderNestedList(item.mountPoint, flatMap)}
          </Route>)
})}
      </>
    );
};
  
  

  const Routes = ({ routeBinds }: { routeBinds: RoutableComponent[] }) => {
    /**
     * Takes a flat list of RoutableComponents and builds nested react router routes 
     */

    const baseRoutableComponents = routeBinds.filter(route => !route.isSubComponent())

    let flatMap: Record<string, RoutableComponent>= {};
    routeBinds.forEach(routableComponent => {
      flatMap[routableComponent.mountPoint.id] = routableComponent
    })


    const routeResolver = useRouteResolver() // Setting up global route resolver ensuring routes can be resolved at any point in the app.
    baseRoutableComponents.forEach(routableComponent =>{
      if (routableComponent.path === undefined){
        throw new Error(`Base routable component can not have path=undefined ${routableComponent}`)
      }
      routeResolver.addRoute(routableComponent.path, routableComponent.mountPoint)
    })

    return (
        <ReactRoutes>
            <>{baseRoutableComponents.map((routeBind) => {
                return (
                    <Route key={routeBind.path + routeBind.mountPoint.path} path={routeBind.path + routeBind.mountPoint.path} element={routeBind.component} >
                        {renderNestedList(routeBind.mountPoint, flatMap)}
                    </Route>  
                )

            })}</>
        </ReactRoutes>
    );
};


export {
    Routes,
    Route
}