import React, {ReactNode, ReactElement} from 'react';
import {Routes as ReactRoutes, Route  } from "react-router-dom";
import { useRouteResolver } from './RouterProvider';
import { RouteRef } from './RouteRef/RouteRef';
import { RouteMap } from './types';
import { RoutableComponent } from './RoutebleComponent';
import { useRouteRef } from './RouteRef/UseRouteRef';


const RenderNestedList = (routeRef: RouteRef, flatMap: Record<string, RoutableComponent>): JSX.Element => {
    const subRouteRefs: RouteRef[] = routeRef.subRouteRefs || [];
    const relevantBinds: RoutableComponent[] = subRouteRefs.map(subRouteRef => flatMap[subRouteRef.id]);


    return (
      <>
        {relevantBinds.map((item, index) => {
            const Component = item.component;
          return (<Route key={item.mountPoint.id} path={item.mountPoint.path} element={<Component/>}>
            {item.mountPoint.subRouteRefs && RenderNestedList(item.mountPoint, flatMap)}
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

    const routeResolver = useRouteResolver();


    return (
        <ReactRoutes>
            <>{baseRoutableComponents.map((routeBind) => {
              const id = routeBind.mountPoint.id;
              const path = `${routeResolver.resolveRouteRef(routeBind.mountPoint)}${routeBind.mountPoint.path}`;
              const Component = routeBind.component;

                return (
                    <Route key={id} path={path} element={<Component/>} >
                        {RenderNestedList(routeBind.mountPoint, flatMap)}
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