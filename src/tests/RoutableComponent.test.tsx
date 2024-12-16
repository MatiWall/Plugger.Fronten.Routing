import React from "react";
import { createRouteRef, RoutableComponent, createRoutableComponent } from "../routing";

test("RoutableComponent Initialize", () => {
    const testRouteRef = createRouteRef(); // Create a test RouteRef

    const TestComponent = () => {
        return <div>My test component</div>;
    };

    // Ensure that creating a RoutableComponent does not throw errors
    expect(() => {
        createRoutableComponent({
            mountPoint: testRouteRef,
            component: <TestComponent />,
            path: "root/",
        });
    }).not.toThrow();
});

test("RoutableComponent with subroutes", () => {
    const testRouteRef = createRouteRef(); // Parent RouteRef
    const sub1TestRouteRef = testRouteRef.createSubRouteRef("test1"); // SubRoute 1
    const sub2TestRouteRef = testRouteRef.createSubRouteRef("test2"); // SubRoute 2

    // Components for each route
    const TestComponent = () => {
        return <div>My test component</div>;
    };
    const Sub1TestComponent = () => {
        return <div>My test1 sub component</div>;
    };
    const Sub2TestComponent = () => {
        return <div>My test2 sub component</div>;
    };

    // Create an array of RoutableComponents
    const routableComponents = [
        { mountPoint: sub1TestRouteRef, component: <Sub1TestComponent /> },
        { mountPoint: sub2TestRouteRef, component: <Sub2TestComponent /> },
        { mountPoint: testRouteRef, component: <TestComponent />, path: "root/" },
    ].map((item) => createRoutableComponent(item));

    // Assertions for the parent route
    const parentRoutableComponent = routableComponents[2];
    expect(parentRoutableComponent.mountPoint).toBe(testRouteRef);
    expect(parentRoutableComponent.component).toEqual(<TestComponent />);
    expect(parentRoutableComponent.path).toBe("root/");

    // Assertions for subroutes
    const sub1RoutableComponent = routableComponents[0];
    expect(sub1RoutableComponent.mountPoint).toBe(sub1TestRouteRef);
    expect(sub1RoutableComponent.component).toEqual(<Sub1TestComponent />);
    expect(sub1RoutableComponent.isSubComponent()).toBe(true);

    const sub2RoutableComponent = routableComponents[1];
    expect(sub2RoutableComponent.mountPoint).toBe(sub2TestRouteRef);
    expect(sub2RoutableComponent.component).toEqual(<Sub2TestComponent />);
    expect(sub2RoutableComponent.isSubComponent()).toBe(true);
});
