import React from 'react';
import {Routes, Route  } from "react-router-dom";
import { useRouteResolver } from './RouterProvider';
import { RouteRef } from './RouteRef/RouteRef';
import { RoutableComponent } from './RoutebleComponent';


const renderNestedList = (routeRef: RouteRef<any>, flatMap: Record<string, RoutableComponent>): JSX.Element => {
    const subRouteRefs: RouteRef<any>[] = routeRef.subRouteRefs || [];
    const relevantBinds: RoutableComponent[] = subRouteRefs.map(subRouteRef => flatMap[subRouteRef.id]);


    return (
      <>
        {relevantBinds.map((item) => {
            const Component = item.component;
          return (<Route key={item.mountPoint.id} path={item.mountPoint.path} element={<Component/>}>
            {item.mountPoint.subRouteRefs && renderNestedList(item.mountPoint, flatMap)}
          </Route>)
})}
      </>
    );
};
  
  

  const RoutesBuilder = ({ routeBinds }: { routeBinds: RoutableComponent[] }) => {
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
        <Routes>
            <>{baseRoutableComponents.map((routeBind) => {
              const id = routeBind.mountPoint.id;
              const path = `${routeResolver.resolveRouteRef(routeBind.mountPoint)}${routeBind.mountPoint.path}`;
              const Component = routeBind.component;

                return (
                    <Route key={id} path={path} element={<Component/>} >
                        {renderNestedList(routeBind.mountPoint, flatMap)}
                    </Route>  
                )

            })}</>
        </Routes>
    );
};


export {
    RoutesBuilder
}