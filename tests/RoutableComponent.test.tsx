import React from "react";
import { createRouteRef, RoutableComponent } from "../src";
RoutableComponent


test('RoutableComponent Initialise', () => {
    const testRouteRef = createRouteRef(); 

    const TestComponent = () => {
        return <div>My test component</div>
    }



    expect(()=> {
        new RoutableComponent(testRouteRef, <TestComponent/>);
    }).not.toThrow();
})



test('RoutableComponent with subroutes', () => {
    const testRouteRef = createRouteRef(); 
    const sub1TestRouteRef = testRouteRef.createSubRouteRef('test1');
    const sub2TestRouteRef = testRouteRef.createSubRouteRef('test2');

    const TestComponent = () => {
        return <div>My test component</div>
    };

    const Sub1TestComponent = () => {
        return <div>My test1 sub component</div>
    };

    const Sub2TestComponent = () => {
        return <div>My test2 sub component</div>
    };

    const routeMap = [
        {routeRef: sub1TestRouteRef, component: <Sub1TestComponent/>},
        {routeRef: sub2TestRouteRef, component: <Sub2TestComponent/>},
    ]

    const routableComponent = new RoutableComponent(testRouteRef, <TestComponent/>, routeMap);
    expect(routableComponent.mountPoint).toBe(testRouteRef);
    expect(routableComponent.component).toEqual(<TestComponent/>);
    expect(routableComponent.subRoutes).toBe(routeMap);
})