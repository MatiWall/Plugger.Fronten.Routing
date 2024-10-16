import React, {ReactNode, ReactElement} from 'react';
import {Routes as ReactRoutes, Route  } from "react-router-dom";
import { useRouteResolver } from './RouterProvider';
import { RouteRef } from './RouteRef/RouteRef';
import { RouteMap } from './types';
import { RoutableComponent } from './RoutebleComponent';

type RoutableComponentBind = {
    path: string,
    routableComponent: RoutableComponent
}

const renderNestedList = (routeRef: RouteRef, binds: RouteMap[]): JSX.Element => {
    const subRouteRefs: RouteRef[] = routeRef.subRouteRefs || [];
    const relevantBinds: RouteMap[] = binds.filter(bind => subRouteRefs.includes(bind.routeRef));
  
    return (
      <>
        {relevantBinds.map((item, index) => (
          <Route key={item.routeRef.path} path={item.routeRef.path} element={item.component}>
            {item.routeRef.subRouteRefs && renderNestedList(item.routeRef, binds)}
          </Route>
        ))}
      </>
    );
  };
  
  

  const Routes = ({ routeBinds }: { routeBinds: RoutableComponentBind[] }) => {
    return (
        <ReactRoutes>
            <>{routeBinds.map((routeBind) => {

                const basePath = routeBind.path;
                const mountPoint = routeBind.routableComponent.mountPoint;
                const component = routeBind.routableComponent.component;
                const subRoutes = routeBind.routableComponent.subRoutes;

                return (
                    <Route key={basePath + mountPoint.path} path={basePath + mountPoint.path} element={component}>
                        {renderNestedList(mountPoint, subRoutes)}
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