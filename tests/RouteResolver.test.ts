import { RouteResolver, createRouteRef } from "../src";


test('Route to route ref', () => {

    const testRouteRef1 = createRouteRef();
    const testRouteRef2 = createRouteRef();
    const testRouteRef3 = createRouteRef();

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path1', testRouteRef1);
    routeResolver.addRoute('/path2', testRouteRef2);
    routeResolver.addRoute('/path3', testRouteRef3);


    expect(routeResolver.resolveRoute('/path1')).toBe(testRouteRef1);
    expect(routeResolver.resolveRoute('/path2')).toBe(testRouteRef2);
    expect(routeResolver.resolveRoute('/path3')).toBe(testRouteRef3)
})

test('RouteRef to route', () => {

    const testRouteRef1 = createRouteRef();
    const testRouteRef2 = createRouteRef();
    const testRouteRef3 = createRouteRef();

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path1', testRouteRef1);
    routeResolver.addRoute('/path2', testRouteRef2);
    routeResolver.addRoute('/path3', testRouteRef3);


    expect(routeResolver.resolveRouteRef(testRouteRef1)).toBe('/path1');

})