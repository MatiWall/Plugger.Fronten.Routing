import { InvalidPathError, RouteResolver, createRouteRef, InvalidRouteRefError } from "../routing";
import { test, expect } from "vitest";

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



test('RouteRef to route with params', () => {

    const testRouteRef1 = createRouteRef({params: ['kind']});
    const testRouteRef2 = createRouteRef({params: ['kind']});
    const testRouteRef3 = createRouteRef({params: ['kind', 'namespace', 'name']});


    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path1', testRouteRef1);


    expect(() => { // Already exists
        routeResolver.addRoute('/path1', testRouteRef2);
    }).toThrow(InvalidPathError);

    expect(() => { // More params, not existing
        routeResolver.addRoute('/path1', testRouteRef3); // more params
    }).not.toThrow(InvalidPathError);

})

test('Allow same path with different params', () => {
    const testRouteRef1 = createRouteRef({ params: ['kind'] });
    const testRouteRef2 = createRouteRef({ params: ['kind', 'namespace'] });

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path', testRouteRef1);

    expect(() => {
        routeResolver.addRoute('/path', testRouteRef2);
    }).not.toThrow(InvalidPathError);
});

test('Resolve route with params', () => {
    const testRouteRef1 = createRouteRef({ params: ['kind'] });
    const testRouteRef2 = createRouteRef({ params: ['kind', 'namespace'] });

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path', testRouteRef1);
    routeResolver.addRoute('/path', testRouteRef2);

    expect(routeResolver.resolveRoute('/path', ['test'])).toBe(testRouteRef1);
    expect(routeResolver.resolveRoute('/path', ['test', 'default'])).toBe(testRouteRef2);
});


test('Resolve route without params defaults to first', () => {
    const testRouteRef1 = createRouteRef({ params: ['kind'] });
    const testRouteRef2 = createRouteRef({ params: ['kind', 'namespace'] });

    const routeResolver = new RouteResolver();
    routeResolver.addRoute('/path', testRouteRef1);
    routeResolver.addRoute('/path', testRouteRef2);

    expect(routeResolver.resolveRoute('/path')).toBe(testRouteRef1);
});


